import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-forbidden-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card style="background-color: transparent;">
      <mat-card-title>Forbidden</mat-card-title>
      <mat-card-content>
        <p>Hey! It looks like this page doesn't exist yet.</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" routerLink="/"><mat-icon>home</mat-icon></button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    :host {
      text-align: center;
    }
  `]
})
export class ForbiddenPageComponent { }
