import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FirstOptionComponent } from './first-option/first-option.component';
import { SecondOptionComponent } from './second-option/second-option.component';
import { ThirdOptionComponent } from './third-option/third-option.component';


const routes: Routes = [
	{ path: '', component: AppComponent },
    { path: 'Option1', component: FirstOptionComponent },
    { path: 'Option2', component: SecondOptionComponent },
    { path: 'Option3', component: ThirdOptionComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

//export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
export class AppRoutingModule { }
