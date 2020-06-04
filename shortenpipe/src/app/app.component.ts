import { Component } from '@angular/core';
import { resolve } from 'url';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appStatus = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('stable');
    }, 2000);
  });
  servers = [
    {
      instanceType : 'medium',
      name : 'Production Server',
      status : 'stable',
      started : new Date(15,1,2017)
    },
    {
      instanceType : 'large',
      name : 'database server',
      status : 'stable',
      started : new Date(17,2,2017)
    },
    {
      instanceType : 'small',
      name : 'TestServer',
      status : 'offline',
      started : new Date(18,6,2020)
    }
  ];
  filteredstatus = ' ';
  getstatusclass(server : {instanceType : string, name : string, status : string, started : Date})
  {
    return {
      'list-group-item-success' : server.status === 'stable',
      'list-group-item-danger' : server.status === 'critical',
      'list-group-item-warning' : server.status === 'offline'
    };
  }

  onAddServer()
  {
    this.servers.push({
      instanceType : 'small',
      name : 'New Server',
      status : 'stable',
      started : new Date(15,1,2017)
    });
  }
}
