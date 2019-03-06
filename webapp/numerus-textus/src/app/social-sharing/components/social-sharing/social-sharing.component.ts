import { Component, Input } from '@angular/core';

import { SocialSharingData } from '../../store/social-sharing.payloads';
import { SharingOption } from './sharing-option.model';

// inspired by https://github.com/MurhafSousli/ngx-sharebuttons
@Component({
  selector: 'app-social-sharing',
  templateUrl: './social-sharing.component.html',
  styleUrls: ['./social-sharing.component.scss']
})
export class SocialSharingComponent {
  @Input() sharingData: SocialSharingData;

  sharingOptions: SharingOption[] = [
    {
      name: 'twitter',
      color: '#1da1f2',
      icon: `M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81
             20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63
             11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43
             3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11
             3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39
             4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13
             1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6
             20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z`,
      url: 'https://twitter.com/intent/tweet?url=',
      metaTags: {
        description: 'text',
        via: 'via',
      },
    },
    {
      name: 'facebook',
      color: '#3c5a99',
      icon: 'M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z',
      url: 'https://www.facebook.com/sharer/sharer.php?u=',
    },
    {
      name: 'google_plus',
      color: '#dd4b39',
      icon: `M23,11H21V9H19V11H17V13H19V15H21V13H23M8,11V13.4H12C11.8,14.4 10.8,16.4 8,16.4C5.6,16.4
             3.7,14.4 3.7,12C3.7,9.6 5.6,7.6 8,7.6C9.4,7.6 10.3,8.2 10.8,8.7L12.7,6.9C11.5,5.7 9.9,5 8,5C4.1,5
             1,8.1 1,12C1,15.9 4.1,19 8,19C12,19 14.7,16.2 14.7,12.2C14.7,11.7 14.7,11.4 14.6,11H8Z`,
      url: 'https://plus.google.com/share?url=',
    },
    {
      name: 'linkedin',
      color: '#0077b5',
      icon: `M21,21H17V14.25C17,13.19 15.81,12.31 14.75,12.31C13.69,12.31 13,13.19
             13,14.25V21H9V9H13V11C13.66,9.93 15.36,9.24 16.5,9.24C19,9.24 21,11.28
             21,13.75V21M7,21H3V9H7V21M5,3A2,2 0 0,1 7,5A2,2 0 0,1 5,7A2,2 0 0,1 3,5A2,2 0 0,1 5,3Z`,
      url: 'http://www.linkedin.com/shareArticle?url=',
      metaTags: {
        title: 'title',
        description: 'summary',
      },
    },
    {
      name: 'whatsapp',
      color: '#25d366',
      icon: `M16.75,13.96C17,14.09 17.16,14.16 17.21,14.26C17.27,14.37 17.25,14.87 17,15.44C16.8,16
             15.76,16.54 15.3,16.56C14.84,16.58 14.83,16.92 12.34,15.83C9.85,14.74 8.35,12.08
             8.23,11.91C8.11,11.74 7.27,10.53 7.31,9.3C7.36,8.08 8,7.5 8.26,7.26C8.5,7 8.77,6.97
             8.94,7H9.41C9.56,7 9.77,6.94 9.96,7.45L10.65,9.32C10.71,9.45 10.75,9.6
             10.66,9.76L10.39,10.17L10,10.59C9.88,10.71 9.74,10.84 9.88,11.09C10,11.35 10.5,12.18
             11.2,12.87C12.11,13.75 12.91,14.04 13.15,14.17C13.39,14.31 13.54,14.29
             13.69,14.13L14.5,13.19C14.69,12.94 14.85,13 15.08,13.08L16.75,13.96M12,2A10,10 0 0,1
             22,12A10,10 0 0,1 12,22C10.03,22 8.2,21.43 6.65,20.45L2,22L3.55,17.35C2.57,15.8 2,13.97
             2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,13.72 4.54,15.31
             5.46,16.61L4.5,19.5L7.39,18.54C8.69,19.46 10.28,20 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z`,
      url: 'https://web.whatsapp.com/send?',
      metaTags: {
        description: 'text',
      },
    },
    {
      name: 'telegram',
      color: '#0088cc',
      icon: `M9.78,18.65L10.06,14.42L17.74,7.5C18.08,7.19 17.67,7.04
             17.22,7.31L7.74,13.3L3.64,12C2.76,11.75 2.75,11.14 3.84,10.7L19.81,4.54C20.54,4.21
             21.24,4.72 20.96,5.84L18.24,18.65C18.05,19.56 17.5,19.78
             16.74,19.36L12.6,16.3L10.61,18.23C10.38,18.46 10.19,18.65 9.78,18.65Z`,
      url: 'https://t.me/share/url?url=',
      metaTags: {
        description: 'text',
      },
    },
    {
      name: 'email',
      color: '#ff8c00',
      icon: 'M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z',
      url: 'mailto:?',
      metaTags: {
        title: 'subject',
        description: 'body',
      },
    },
  ];

  getFullEncodedUrl(sharingOption: SharingOption): string {
    let encodedLink: string = encodeURIComponent(this.sharingData.url);

    if (sharingOption.metaTags) {
      Object.keys(sharingOption.metaTags).map((key) => {
        if (this.sharingData[key]) {
          encodedLink += `&${sharingOption.metaTags[key]}=${encodeURIComponent(this.sharingData[key])}`;
        }
      });
    }

    return sharingOption.url + encodedLink;
  }
}
