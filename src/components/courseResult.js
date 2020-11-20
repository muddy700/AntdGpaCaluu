import { Card , Spin , Typography} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import '../index.css'

export const CourseResult = (props) => {

  const { gpa , totalCourses } = props
  const { Title } = Typography
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const spinner = <Spin tip="Waiting For Data To Calculate GPA" indicator={antIcon} />

  return(
       <Card title="Result" style={{width : 300}} >
            <Title level={2}>{gpa !== '' ? 'Your GPA Is : ' + gpa.toFixed(1) : spinner } </Title> <br />
      </Card>
  ) }