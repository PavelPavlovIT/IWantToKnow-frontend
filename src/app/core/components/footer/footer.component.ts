import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() lang: string | undefined = "en";

  getTitleSupport() {
    switch (this.lang) {
      case 'es':
        return 'Contactos: support@iwanttoknow.net';
      case 'ru':
        return 'Контакты: support@iwanttoknow.net';
      default:
        return 'Contacts: support@iwanttoknow.net';
    }
  }

}
