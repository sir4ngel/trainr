import '../../../../global.js';
class ClassroomHandler{
    onEnterClassroom = async (classroomData, token) => {
        try {
            var data ={
                "code": classroomData.code,
                "user_id": classroomData.user_id
            }
            var fetchedData = await fetch('http://' + global.ip + '/trainr/public/api/classroom/student/asign', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(resData => {
                    return resData
                });
        } catch (error) {
            console.log(error);
        }
        return fetchedData;
    }

    onGetClassrooms = async (user_id, token) => {
        try {
            var fetchedData = await fetch('http://' + global.ip + '/trainr/public/api/classroom/student/get?user_id=' + user_id, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(res => res.json())
                .then(resData => {
                    return resData
                });
        } catch (error) {
            console.log(error);
        }
        return fetchedData;
    }
}

const classroomHandler = new ClassroomHandler();

export default classroomHandler;