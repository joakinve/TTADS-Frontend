import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  constructor(private breakpointObserver: BreakpointObserver) {}

  /** Detecta si el dispositivo es móvil (menos de 992px) */
  isMobile$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 991.98px)'])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
