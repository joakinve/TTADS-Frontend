import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HomeRoutingModule } from './home-routing.module'
import { HomeComponent } from './home.component'
// Views

import { CarruselComponent } from './carrusel/carrusel.component'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AboutComponent } from './views/about/about.component'
import { FaqComponent } from './views/faq/faq.component'
import { MaterialModule } from 'src/app/shared/modules/material/material.module'

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    FaqComponent,
    CarruselComponent
  ],
  imports: [CommonModule, HomeRoutingModule, MaterialModule, FontAwesomeModule]
})
export class HomeModule {}
