import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HowItWorkComponent } from './components/how-it-work/how-it-work.component';

const routes: Routes = [{ path: '', component: MainComponent },{path:'how-it-work',component:HowItWorkComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
