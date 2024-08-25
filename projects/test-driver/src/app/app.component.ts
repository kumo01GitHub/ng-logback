import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoggerService } from 'ng-logback';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'test-driver';

  constructor() {
    const loggerService = new LoggerService();
    loggerService.getLogger().info(this.title);
  }
}
