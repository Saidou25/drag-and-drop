class ProjectState {
  private listeners: any[] = [];
  private projects: any[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenerFn: Function) {
    this.listeners.push(listenerFn);
  }
  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = {
      id: Math.random().toString(),
      title: title,
      description: description,
      people: numOfPeople,
    };
    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();

class ProjectForm {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  formElement: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLTextAreaElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    // Select template and host elements
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    // Import the content of the template
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.formElement = importedNode.firstElementChild as HTMLFormElement;
    this.formElement.id = "user-input";

    // Access input elements after they are part of the form
    this.titleInputElement = this.formElement.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.formElement.querySelector(
      "#description"
    ) as HTMLTextAreaElement;
    this.peopleInputElement = this.formElement.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configureForm();
    this.attach();
  }

  private gatherUserInput(): [string, string, number] | void {
    const titleData = this.titleInputElement.value.trim();
    const descriptionData = this.descriptionInputElement.value.trim();
    const peopleData = this.peopleInputElement.value.trim();

    if (
      titleData.trim().length === 0 ||
      descriptionData.trim().length === 0 ||
      peopleData.trim().length === 0
    ) {
      alert("Invalid input, please try again!");
      return;
    } else {
      console.log(
        `Title: ${titleData}, Description: ${descriptionData}, People: ${peopleData}`
      );
      return [titleData, descriptionData, +peopleData];
    }
  }

  private clerarInputs = () => {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  };

  private handleSubmit(event: Event) {
    event.preventDefault();

    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [titleData, descriptionData, peopleData] = userInput;
      console.log(
        `Title: ${titleData}, Description: ${descriptionData}, People: ${peopleData}`
      );
      projectState.addProject(titleData, descriptionData, peopleData);
      this.clerarInputs();
    }
  }

  private configureForm() {
    this.formElement.addEventListener("submit", this.handleSubmit.bind(this));
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
  }
}

const prj = new ProjectForm();

class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  projectListElement: HTMLElement;
  assingnedProjects: any[];

  constructor(private type: "active" | "finished") {
    this.templateElement = document.getElementById(
      "project-list"
    ) as HTMLTemplateElement;
    this.hostElement = document.getElementById("app") as HTMLDivElement;
    this.assingnedProjects = [];
    this.projectListElement = document.querySelector(".project") as HTMLElement;

    // Import the content of the template
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.projectListElement = importedNode.firstElementChild as HTMLFormElement;
    this.projectListElement.id = `${this.type}-projects`;

projectState.addListener((projects: any[]) => {
  this.assingnedProjects = projects;
this.renderProjects();
})

    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById( `${this.type}-projects-list`)! as HTMLUListElement;
    for (const prjItem of this.assingnedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem)
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.projectListElement.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
    this.projectListElement.querySelector("ul")!.id = listId;
  }

  private attach() {
    this.hostElement.insertAdjacentElement(
      "beforeend",
      this.projectListElement
    );
  }
}

const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");

