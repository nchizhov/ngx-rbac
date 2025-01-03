import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Optional, SkipSelf } from '@angular/core';
import { DoProvideRulesComponent } from 'ngx-rbac';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-route1',
  template: `
    <h1>route 1</h1>
    <hr />
    <a routerLink='/'>home</a><br>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Route1Component implements OnInit, OnDestroy {
  protected destroy$ = new Subject<void>();

  constructor(
    @Optional()
    @SkipSelf()
    public source: DoProvideRulesComponent
  ) {}


  ngOnInit(): void {
    this.source?.provideRulesService.can$
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ roles, can }) => {
        console.log(
          roles[0]?.name + ' can GUARD_RULE ' + can('GUARD_RULE')
        );
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
