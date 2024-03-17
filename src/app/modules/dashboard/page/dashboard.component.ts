import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

import { citas } from '../../../data/citas';
import { especialidades } from 'src/app/data/especialidades';
import { pacientes } from 'src/app/data/pacientes';
import { PercentageCalculatorService } from 'src/app/core/presentation/services/percentaje-calculator.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  pacientesData = pacientes;
  top7Especialidades: any;
  top7Pacientes: any[] = [];
  ultimas10Citas: any[] = [];
  cardData: [string, number, string, string, string][] = [
    ["Pacientes", 1400, "5% from the last day", "bi bi-people-fill", "bg-gradient-purple"],
    ["Ingresos", 250, "19% from the last week", "bi bi-currency-exchange", "bg-gradient-green"],
    ["Usuarios", 750, "2.1% from the last month", "bi bi-people-fill", "bg-gradient-red"],
    ["Citas", 980, "0.3% from the last week", "bi bi-calendar", "bg-gradient-skyblue"]
  ];
  public datasetsPieChart = [
    {
      data: [20,30,20],
      label: 'Cantidad',
      backgroundColor: [
        'rgb(243, 38, 85)',
        'rgb(0, 136, 241)',
        'rgb(75, 198, 51)'
      ],
      hoverOffset: 4,
      hoverBackgroundColor: [
        'rgb(243, 38, 85)',
        'rgb(0, 136, 241)',
        'rgb(75, 198, 51)'
      ],
      borderColor: [
        'rgb(243, 38, 85)',
        'rgb(0, 136, 241)',
        'rgb(75, 198, 51)'
      ],
      hoverBorderColor: [
        'rgb(243, 38, 85)',
        'rgb(0, 136, 241)',
        'rgb(75, 198, 51)'
      ],
    }
  ]

  constructor(private percentajeCalculatorService: PercentageCalculatorService){}

  ngOnInit(): void {
    //!Ordena las especialidades de forma descendente
    especialidades.sort((a, b) => b.percentaje - a.percentaje);
    this.top7Especialidades = especialidades.slice(0, 7);//*Selecciona los 7 primeras especialidades

    //!Ordena las pacientes de forma descendente
    const citasPorUsuario = new Map<number, number>();
    const usuariosData = new Map<number, any>();
    //* Contabilizar las citas por usuario y acumular datos de usuarios
    pacientes.forEach((cita) => {
      const idUsuario = cita.idUsuario;
      citasPorUsuario.set(idUsuario, (citasPorUsuario.get(idUsuario) || 0) + 1);
  
      //* Almacenar datos de usuarios si aún no se han registrado
      if (!usuariosData.has(idUsuario)) {
        usuariosData.set(idUsuario, {
          idCita: cita.idCita,
          idUsuario: cita.idUsuario,
          name: cita.name,
          lastName: cita.lastName,
          citasCount: 0, //* Inicializar el contador de citas para este usuario
        });
      }
    });

    //* Actualizar la cantidad de citas para cada usuario en usuariosData
    citasPorUsuario.forEach((citasCount, idUsuario) => {
      if (usuariosData.has(idUsuario)) {
        usuariosData.get(idUsuario).citasCount = citasCount;
      }
    });

    const sortedUsuarios = Array.from(citasPorUsuario.entries()).sort((a, b) => b[1] - a[1]);
    this.top7Pacientes = sortedUsuarios.slice(0, 7).map(([idUsuario]) => usuariosData.get(idUsuario));

    //! Filtrar las citas que están programadas para el día de hoy y en el futuro
    const fechaHoraActual = new Date().toISOString();
    //* Filtrar y seleccionar las últimas 10 citas programadas para el día de hoy y en el futuro
    for (let i = citas.length - 1; i >= 0; i--) {
      const cita = citas[i];
      if (new Date(cita.date) >= new Date(fechaHoraActual)) {
        this.ultimas10Citas.unshift(cita);
        if (this.ultimas10Citas.length === 10) {
          break; //* Detener el bucle una vez que se seleccionen las últimas 10 citas
        }
      }
    }
    
    const dataTest = [
      {
        "service": "Servicio A",
        "money": "100"
      },
      {
        "service": "Servicio B",
        "money": "200"
      },
      {
        "service": "Servicio A",
        "money": "150"
      },
      {
        "service": "Servicio C",
        "money": "75"
      }
    ];
    
  }

  //! Graficos Estadisticos
  //? Estadisticas de Citas
  public doughnutChartLabels: string[] = [ 'Citas Pendientes', 'Citas Completadas', 'Nuevas Citas' ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels:{
          usePointStyle: true,
          pointStyle: 'circle',
          color: '#fff',
          font: {
            family: 'var(--font-karla)',
            size: 13,
            weight: 'bold',
          },
          boxWidth: 6,
          boxHeight: 6
        }
      },
      
    },
    maintainAspectRatio: false
  };

  //? Cifras de Citas
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic'
    ],
    datasets: [
      {
        data: [ 28, 48, 40, 19, 86, 27, 90, 53, 34, 0, 0, 0 ],
        label: 'Citas Completadas',
        fill: true,
        tension: 0.5,
        borderColor: 'rgb(51, 96, 255)',
        backgroundColor: 'rgba(51, 96, 255,0.3)',
        pointBackgroundColor: 'rgb(51, 96, 255)'
      }
    ]
  };
  public lineChartOptions: ChartOptions = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          color: 'white'
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  //? Estadisticas de Servicios
  public pieChartOptions: ChartOptions<'pie'> = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          color: 'white',
          useBorderRadius: false
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };
  public pieChartLabels = [ [ 'Consulta', 'médica', 'general' ], [ 'Exámenes', 'de', 'Laboratorio' ], ['Servicio', 'de atención', 'preventiva'], ['Atención', 'pediátrica'], ['Atención', 'ginecológica'], ['Atención', 'dental'], ['Atención', 'mental'] ];
  public pieChartDatasets = [
    {
      data: [ 300, 500, 100, 270, 320, 180, 250 ],
      backgroundColor: ['rgb(41, 199, 38)', 'rgb(253, 85, 143)', 'rgb(114, 89, 182)', 'rgb(254, 201, 4)', 'rgb(0, 112, 237)', 'rgb(254, 102, 5)', 'rgb(188, 149, 128)']
    }
  ];

  //?
  public barChartLabels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep'];
  public barChartDatasets = [
    {
      label: 'Ingresos',
      data: [15, 25, 10, 30, 20, 13, 22, 36, 26],
      backgroundColor: 'rgba(7, 98, 237, 0.9)',
      borderColor: 'rgba(7, 98, 237, 1)',
      borderWidth: 1
    },
    {
      label: 'Egresos',
      data: [30, 10, 20, 15, 25, 17, 20, 13, 25],
      backgroundColor: 'rgba(255, 0, 131, 0.9)',
      borderColor: 'rgba(255, 0, 131, 1)',
      borderWidth: 1
    }
  ]
  public barChartOptions: ChartOptions<'bar'> = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          color: 'white'
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  }
}
