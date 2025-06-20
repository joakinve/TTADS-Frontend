import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AuthRoutingModule } from './auth-routing.module'
import { AuthComponent } from './auth.component'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { ResetPasswordComponent } from './components/reset-password/reset-password.component'
import { ReactiveFormsModule } from '@angular/forms'
import { ComponentsModule } from 'src/app/shared/modules/components/components.module'
import { MaterialModule } from 'src/app/shared/modules/material/material.module'

const modules = [ComponentsModule, MaterialModule]

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent
  ],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, ...modules]
})
export class AuthModule {}
