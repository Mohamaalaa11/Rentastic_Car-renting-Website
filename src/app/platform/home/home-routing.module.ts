import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HowItWorkComponent } from './components/how-it-work/how-it-work.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TablefiltterComponent } from './components/home/tablefiltter/tablefiltter.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'how-it-work', component: HowItWorkComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'filtered-cars', component: TablefiltterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
