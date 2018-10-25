import React from 'react';
import { Badge, Collapse, ListGroupItem, Table} from 'reactstrap';
import HovertrMsg from './HoverMsg';

class TestCase extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleToolTip = this.toggleToolTip.bind(this);
    this.state = { isOpen: false, showBadge: true, tooltipOpen: false };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      showBadge: !this.state.showBadge,
    });
  }
  toggleToolTip() {
    this.setState({ tooltipOpen: !this.state.tooltipOpen });
  }
  render() {
    const testCases = this.props.testCases;
    return (
      <ListGroupItem className="justify-content-between" onClick={this.toggle}>
        <div>
          <cite className="fas fa-vial">  {this.props.name}  </cite>
          <span>  </span>
          <Badge pill className={this.state.showBadge ? "" : "d-none"}>{this.props.count}</Badge>
        </div>
        <Collapse isOpen={this.props.isOpen || this.state.isOpen}>
          <Table bordered>
            <caption>{testCases[0].classname}</caption>
            <thead>
              <tr>
                <th scope="col" style={{width: "7%"}}>#</th>
                <th scope="col" style={{width: "80%"}}>Name</th>
                <th scope="col" style={{width: "13%"}}>Time (ms)</th>
              </tr>
            </thead>
            {
              testCases.map((testCase, index) => {
                let status = "table-success";
                if (testCase.failure != undefined) {
                  status = "table-danger";
                  return (
                    <tbody key={index.toString()}>
                      <tr className={status}>
                        <th scope="row" style={{width: "7%"}}>{index + 1}</th>
                        <td style={{width: "80%"}}>
                          <HovertrMsg name={testCase.name} message={testCase.failure[0].message} />
                        </td>
                        <td style={{width: "13%"}}>{Number(testCase.time) * 1000}</td>
                      </tr>
                    </tbody>
                  );
                }
                if (testCase.skipped != undefined) {
                  status = "table-warning";
                }
                return (
                  <tbody key={index.toString()}>
                    <tr className={status}>
                      <th scope="row" style={{width: "7%"}}>{index + 1}</th>
                      <td style={{width: "80%"}}>{testCase.name}</td>
                      <td style={{width: "13%"}}>{Number(testCase.time) * 1000}</td>
                    </tr>
                  </tbody>
                );
              })
            }
          </Table>
        </Collapse>
      </ListGroupItem>
    );
  }
}

export default TestCase;