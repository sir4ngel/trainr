import '../../../../global.js';
class RoutineHandler {
    onGetRoutine = async (routineData, token) => {
        try {
            var fetchedData = await fetch('http://' + global.ip + '/api/routine/student/get?user_id=' + routineData.user_id + '&date=' + routineData.date + '&classroom_id=' + routineData.classroom_id, {
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

const routineHandler = new RoutineHandler();

export default routineHandler;