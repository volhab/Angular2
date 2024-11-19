import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})

export class KanbanBoard implements OnInit {

  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose

  @ViewChild('newTask') newTaskValue: any;

  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }
  
  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }

  addTask = (newTask: string) =>  {
      if (newTask != '') {
        this.tasks.push({ name: newTask, stage: 0});
        this.configureTasksForRendering();
        this.newTaskValue.nativeElement.value = '';
      }
  }

  deleteTask = (task: string, stage: number) => {
    var el = this.tasks.findIndex(t => t.name == task && t.stage == stage);
    this.tasks.splice(el, 1);
    this.configureTasksForRendering();
  }

  backTask(task: string, stage: number) {
    var el = this.tasks.find(t => t.name == task && t.stage == stage);
    if (el.stage > 0) {
      el.stage--;
      this.configureTasksForRendering();
    }
  }

    
  forwardTask(task: string, stage: number) {
    var el = this.tasks.find(t => t.name == task && t.stage == stage);
    if (el.stage < 3) {
      el.stage++;
      this.configureTasksForRendering();     
    }
  }
}

interface Task {
  name: string;
  stage: number;
}