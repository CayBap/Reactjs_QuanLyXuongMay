import React from 'react';
import {
  Row,Col,Card,CardBody,CardHeader,Input,Label,FormGroup,Table,Button,ButtonGroup,CardFooter,Pagination,PaginationItem,PaginationLink
} from 'reactstrap';
import bn from 'utils/bemnames';



const bem = bn.create('TakeLeave');

class TakeLeave extends React.Component {
 

  render() {
    return (
        <Row>
        <Col sm="12">
        <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
            <Card>
                <CardHeader>
                <FormGroup style = {{width:300}}>
                    <Label for="exampleSelect">Tình trạng</Label>
                    <Input type="select" name="select" id="exampleSelect">
                        <option>Đã duyệt</option>
                        <option>Chưa duyệt</option>
                    </Input>
                </FormGroup>
                </CardHeader>
                <CardBody>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên nhân viên</th>
                                <th>
                                    Thời gian
                                </th>
                                <th>Lý do</th>
                                <th>Ca làm việc</th>
                                <th style = {{width:200}}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody >
                            <tr  className = {bem.e('row')} >
                                <th scope="row">1</th>
                                <td>Đỗ Thắng</td>
                                <td>12/12/2019</td>
                                <td>Đi chơi với người yêu</td>
                                <td>Sáng</td>
                                <td>  <ButtonGroup>
            <Button color = "info">Duyệt</Button>
            <Button color = "danger">Từ chối</Button>
        </ButtonGroup></td>
                            </tr>
                        </tbody>
                    </Table>
                </CardBody>
                <CardFooter>
                    <Pagination aria-label="Page navigation example">
                        <PaginationItem>
                        <PaginationLink previous href="#" />
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationLink href="#">
                            1
                        </PaginationLink>
                        </PaginationItem>
                        <PaginationItem active>
                        <PaginationLink href="#">
                            2
                        </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationLink href="#">
                            3
                        </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationLink href="#">
                            4
                        </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationLink href="#">
                            5
                        </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                        <PaginationLink next href="#" />
                        </PaginationItem>
                    </Pagination>
                </CardFooter>
            </Card>
        </Col>
    </Row>
        </Col>
    </Row>
    );
  }
}

export default TakeLeave;
