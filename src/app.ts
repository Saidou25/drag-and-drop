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
