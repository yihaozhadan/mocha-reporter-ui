import React, { useState } from 'react';
import { Badge, Collapse, ListGroupItem, Table } from 'reactstrap';
import HovertrMsg from './HoverMsg';

const TestCase = (props) => {
  const [isOpen, toggleOpen] = useState(props.isOpen || false);
  return (
    <ListGroupItem className="justify-content-between" onClick={toggleOpen(!isOpen)}>
      <div>
        <cite className="fas fa-vial" />
        <span className="testTitle">
          {this.props.name}
          <style jsx>{`
            .testTitle {
              margin-left: 0.4em;
              margin-right: 0.4em;
            }
          `}</style>
        </span>
        <Badge pill className={!this.state.isOpen ? '' : 'd-none'}>
          {this.props.count}
        </Badge>
      </div>
      <Collapse isOpen={this.state.isOpen}>
        <Table bordered>
          <caption>{props.testCases[0].classname}</caption>
          <thead>
            <tr>
              <th scope="col" style={{ width: '7%' }}>
                #
              </th>
              <th scope="col" style={{ width: '80%' }}>
                Name
              </th>
              <th scope="col" style={{ width: '13%' }}>
                Time (ms)
              </th>
            </tr>
          </thead>
          {props.testCases.map((testCase, index) => {
            let status = 'table-success';
            if (testCase.failure) {
              status = 'table-danger';
              return (
                <tbody key={index.toString()}>
                  <tr className={status}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <HovertrMsg
                        index={index}
                        name={testCase.name}
                        message={testCase.failure[0].message}
                      />
                    </td>
                    <td style={{ width: '13%' }}>{Number(testCase.time) * 1000}</td>
                  </tr>
                </tbody>
              );
            }
            if (testCase.skipped) {
              status = 'table-warning';
            }
            return (
              <tbody key={index.toString()}>
                <tr className={status}>
                  <th scope="row" style={{ width: '7%' }}>
                    {index + 1}
                  </th>
                  <td style={{ width: '80%' }}>{testCase.name}</td>
                  <td style={{ width: '13%' }}>{Number(testCase.time) * 1000}</td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </Collapse>
    </ListGroupItem>
  );
};

export default TestCase;
