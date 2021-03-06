'use strict';

/**
 * @ngdoc function
 * @name psmsApp.controller:exportScholarsCtrl
 * @description
 * # exportScholarsCtrl
 * Controller of the psmsApp
 */ 

var app = angular.module('psmsApp');
app.controller('exportScholarsCtrl',['$scope', '$filter', '$timeout', 'schoolApiService', 'addressApiService', 'exportScholarsApiService', 'exportService', 'uiGridConstants',
  function ($scope, $filter, $timeout, schoolApiService, addressApiService, exportScholarsApiService, exportService, uiGridConstants) {

  var ex = this;

  ex.number = 1;
  ex.mergedChunks = [];
  ex.municipalities = [];
  ex.schools = [];

  ex.gridOptions = {
    enableFiltering: true,
    enableColumnResizing: true,
    enableGridMenu: true,
    data: ex.mergedChunks,
    importerDataAddCallback: function ( grid, newObjects ) {

    },
    columnDefs: [
      { field: 'index', displayName: 'NO.', width: '50',  enableFiltering: false, pinnedLeft:true, enableSorting: false, cellClass: 'row-no', cellTemplate: '<div class="ui-grid-cell-contents">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>' },
      { field: 'lastname', width: '15%', enablePinning:true,
        filter: {
          condition: uiGridConstants.filter.EXACT,
        } 
      },
      { field: 'firstname', width: '20%', enablePinning:true },
      { field: 'middlename', width: '15%', enablePinning:true },
      { field: 'date_of_birth', width: '10%' },
      { field: 'gender', width: '10%',
        filter: {
          type: uiGridConstants.filter.SELECT,
          condition: uiGridConstants.filter.EXACT,
          selectOptions: [ { value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' } ]
        }
      },
      { displayName:'Status', field: 'scholar_status', width: '10%',
        filter: {
          type: uiGridConstants.filter.SELECT,
          condition: uiGridConstants.filter.EXACT,
          selectOptions: [ { value: 'NEW', label: 'NEW' }, { value: 'OLD', label: 'OLD' } ]
        }
      },
      { displayName:'Contract Status', field: 'contract_status', width: '10%',
        filter: {
          type: uiGridConstants.filter.SELECT,
          condition: uiGridConstants.filter.EXACT,
          selectOptions: [ { value: 'Pre-Approved', label: 'Pre-Approved' }, { value: 'Approved', label: 'Approved' }, { value: 'Pending', label: 'Pending' }, { value: 'In-Active', label: 'In-Active' } ]
        }
      },
      { displayName:'Address', field: 'address', width: '30%' },
      { displayName:'Municipality', field: 'municipality', width: '10%',
        filter: {
          type: uiGridConstants.filter.SELECT,
          condition: uiGridConstants.filter.EXACT,
          selectOptions: ex.municipalities
        }
      },
      { displayName:'Father', field: 'father', width: '30%' },
      { displayName:'Mother', field: 'mother', width: '30%' },
      { displayName:'School', field: 'school_name', width: '20%',
        filter: {
          type: uiGridConstants.filter.SELECT,
          condition: uiGridConstants.filter.EXACT,
          selectOptions: ex.schools
        }
      },
      { displayName:'Degree', field: 'degree', width: '10%',
        filter: {
          type: uiGridConstants.filter.SELECT,
          condition: uiGridConstants.filter.EXACT,
          selectOptions: [ 
            { value: 'Undergraduate', label: 'Undergraduate' }, 
            { value: 'Masters', label: 'Masters' },
            { value: 'Doctorate', label: 'Doctorate' }
          ]
        }
      },
      { displayName:'Student ID NO.', field: 'student_id_number', width: '10%' },
      { displayName:'Course', field: 'course', width: '30%' },
      { displayName:'Section', field: 'section', width: '10%' },
      { displayName:'Yearl level', field: 'year_level', width: '10%',
        filter: {
          type: uiGridConstants.filter.SELECT,
          condition: uiGridConstants.filter.EXACT,
          selectOptions: [ 
            { value: 'I', label: '1st year' }, 
            { value: 'II', label: '2nd year' },
            { value: 'III', label: '3rd year' },
            { value: 'IV', label: '4th year' },
            { value: 'V', label: '5th year' },
            { value: 'VI', label: '6th year' }
          ]
        },
        cellFilter: 'formatYear'
      },
      { displayName:'Semester', field: 'semester', width: '10%',
        filter: {
          type: uiGridConstants.filter.SELECT,
          condition: uiGridConstants.filter.EXACT,
          selectOptions: [ 
            { value: '1st Semester', label: '1st Semester' }, 
            { value: '2nd Semester', label: '2nd Semester' },
            { value: '3rd Semester', label: '3rd Semester' }
          ]
        }
      },
      { displayName:'Academic year', field: 'academic_year', width: '10%' },
      { displayName:'Amount', field: 'amount', width: '10%' },
      { displayName:'IP', field: 'IP', width: '10%',
        filter: {
          type: uiGridConstants.filter.SELECT,
          condition: uiGridConstants.filter.EXACT,
          selectOptions: [ { value: 'YES', label: 'YES' }, { value: 'NO', label: 'NO' } ]
        }
      }
    ],
    enableGridMenu: true,
    enableSelectAll: true,
    exporterCsvFilename: 'Imported_scholars.csv',
    exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
    exporterExcelFilename: 'Imported_scholars.xlsx',
    exporterExcelSheetName: 'Scholars',
    onRegisterApi: function(gridApi){
      
      ex.gridApi = gridApi;

      ex.gridApi.core.on.rowsRendered($scope, function() {

        ex.filteredGrid = ex.gridApi.core.getVisibleRows().map((row)=>{
          return row.entity;
        });

      });

    }
  };

  ex.exportForDatabase = function(){
    $timeout(exportService.exportForDatabase(ex.filteredGrid, ex), 500);
  }

  ex.exportMasterlist = function(){
    $timeout(exportService.exportMasterlist(ex.filteredGrid, ex), 500);
  }

  ex.exportNormal = function(){
    $timeout(exportService.exportNormal(ex.filteredGrid, ex), 500);
  }

  function getScholarsToExport(){

     let searched = { 
        searched_name: ex.scholar_lastname,
        age: ex.age,
        gender: ex.gender,
        scholar_status: ex.scholar_status,
        contract_status: ex.contract_status,
        address: ex.address,
        municipality: ex.municipality,
        degree: ex.degree,
        course: ex.course,
        section: ex.section,
        schoolId: ex.school,
        student_id_number: ex.student_id_number,
        year_level: ex.year_level,
        semester: ex.semester,
        academic_year: ex.academic_year,
        IP: ex.IP,
    };

     exportScholarsApiService.getScholarsToExport(searched).then(response => {

      splitArrayOfChunks(response.data);

      ex.scholars_loaded = true;
      // ex.hide_spinner = true;

    }, err => {
      console.log(err);
    });    
  }

  function splitArrayOfChunks(array_of_chunks){
    for (var i = 0; i < array_of_chunks.length; i++) {
      mergeChunks(array_of_chunks[i]);
    }

    // ex.gridOptions.columnDefs[9].filter.selectOptions = ex.municipalities;
  }

  function mergeChunks(chunk){
    for (var i = 0; i < chunk.length; i++) {

      includeMunicipalityForFilter(chunk[i].municipality);
      includeSchoolForFilter(chunk[i].school_name);

      Object.assign(chunk[i], { row_no: ex.number++, amount: $filter('currency')($filter('amount')(chunk[i]), '', 0), father: $filter('fatherDetails')(chunk[i].father_details), mother: $filter('motherDetails')(chunk[i].mother_details) });
      ex.mergedChunks.push(chunk[i]);
   
    }
  }

  function includeMunicipalityForFilter(municipality){
    if (!ex.municipalities.some(item => item.value === municipality)) {
      ex.municipalities.push({ value: municipality, label: municipality });
    }
  }

  function includeSchoolForFilter(school_name){
    if (!ex.schools.some(item => item.value === school_name)) {
      ex.schools.push({ value: school_name, label: school_name });
    }
  }

  getScholarsToExport();
  
}]);

