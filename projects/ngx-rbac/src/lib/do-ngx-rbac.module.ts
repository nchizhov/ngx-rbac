import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoProvideRulesComponent } from './component/do-provide-rules.component';
import { DoCanPipe } from './pipe/do-can.pipe';
import { DoDebugComponent } from './component/do-debug.component';
import { DoDebugPipe } from './pipe/do-debug.pipe';

@NgModule({
  declarations: [
    DoProvideRulesComponent,
    DoCanPipe,
    DoDebugPipe,
    DoDebugComponent
  ],
  exports: [
    DoCanPipe,
    DoProvideRulesComponent,
    DoDebugPipe,
    DoDebugComponent],
  imports: [
    CommonModule
  ]
})
export class DoNgxRbacModule {}
