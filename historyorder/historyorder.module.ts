import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistoryorderPage } from './historyorder.page';

import { NgCalendarModule  } from 'ionic2-calendar';
// import { ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: HistoryorderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgCalendarModule
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [HistoryorderPage]
})
export class HistoryorderPageModule {}
