import { Card , Table , Button} from 'antd';
import '../index.css'

export const CourseTable = (props) => {

    const columns = [{
        title: 'Course ID',
         dataIndex: 'id',
        },
     {
         title: 'Grade ',
         dataIndex: 'gradeLetter',
        },
     {
         title: 'Grade Value ',
         dataIndex: 'gradePoint',
     },
     {
         title: 'Course Credit',
         dataIndex: 'credit',
     },
    ];

    const { selectedCourses , deleteCourses ,loading , courses , editCourseInfo , rowSelection } = props
    const tableTitle = selectedCourses.length === 1 ? ' Course Selected' : ' Courses Selected'
    const hasSelected = selectedCourses.length > 0
    const selectedSize = selectedCourses.length

    return(
         <Card title="Courses Info" style={{width : 700}} >
            <Button type="primary" disabled={!hasSelected} onClick={deleteCourses} loading={loading}>Delete</Button>
            <span style={{ marginLeft: 8 }} >{hasSelected ? selectedSize + tableTitle : '' } </span>
            <Table rowSelection={rowSelection} columns={columns} dataSource={courses} onRow={(record, rowIndex) => {
                return { onClick: event => {editCourseInfo(record.id)} }; }}/>
      </Card>
    )
}