import * as React from "react";

export class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      currentName: "",
      names: [],
      randomSelected: -1,
      randomName: ""
    };
  }

  public handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    this.setState({
      currentName: "",
      names: [
        ...this.state.names,
        {
          id: this._timeInMilliseconds(),
          value: this.state.currentName
        }
      ]
    });
  }

  public deleteName(id: number): void {
    const fileteredName: Array<IName> = this.state.names.filter(
      (name: IName) => name.id !== id
    );
    this.setState({ names: fileteredName });
  }

  public renderNames(): JSX.Element[] {
    return this.state.names.map((name: IName, index: number) => {
      return (
        <div key={name.id} className="nameItem">
          <span>{name.value}</span>
          <button
            onClick={() => this.deleteName(name.id)}
            className="deleteButton"
          >
            Remove
          </button>
        </div>
      );
    });
  }

  public randomName(): void {
    const totalNames: number = this.state.names.length;
    if (totalNames > 0) {
      if (totalNames > 1) {
        var randomNumber = this.state.randomSelected;
        while (this.state.randomSelected == randomNumber) {
          randomNumber = Math.floor(Math.random() * totalNames);
        }
      } else {
        randomNumber = 0;
      }
      this.setState({
        randomSelected: randomNumber,
        randomName: this.state.names[randomNumber].value
      });
    } else {
      this.setState({
        randomName: "No names in the list to select. Please add names first"
      });
    }
    return;
  }

  public render(): JSX.Element {
    console.log(this.state);
    return (
      <div>
        <h1>Demo Name List</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="text"
            placeholder="Add name"
            value={this.state.currentName}
            onChange={e => this.setState({ currentName: e.target.value })}
          />
          <button type="submit">Add Name</button>
        </form>

        <hr />
        <section>{this.renderNames()}</section>
        <hr />
        <button onClick={() => this.randomName()}>Pick Random Name</button>
        <span className="randomName">{this.state.randomName}</span>
      </div>
    );
  }

  private _timeInMilliseconds(): number {
    const date: Date = new Date();
    return date.getTime();
  }
}

interface IState {
  currentName: string;
  names: Array<IName>;
  randomSelected: number;
  randomName: string;
}

interface IName {
  id: number;
  value: string;
}
