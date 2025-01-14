class ProjectForm {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor() {
    // Select elements from the DOM and assign them to the properties
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    // Import the HTML element using innerHTML
    const templateContent = this.templateElement.innerHTML;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = templateContent;

    // Extract the form element from the wrapper. The firstElementChild of the wrapper is used to retrieve the form element.
    this.element = wrapper.firstElementChild as HTMLFormElement;
    //   The attach method inserts the element into the hostElement (app div)
    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prj = new ProjectForm();