import { NgModule } from '@angular/core';
import { SplitPipe } from '../split.pipe';

@NgModule({
    imports:[],
    declarations: [
        SplitPipe
    ],
    exports: [
        SplitPipe
    ]
})
export class GlobalModule{}