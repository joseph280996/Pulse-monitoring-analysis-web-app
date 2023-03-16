import AnalysisView from "./Analysis.view";

const getMinXValueFromDataList = (dataList: any[]) => {
    let minValue = 0;
    dataList.forEach(data => {
        const firstElementTimeStamp = data[0].timeStamp;
        if(firstElementTimeStamp < minValue){
            minValue = 0;
        }
    })
}

const Analysis = () => {
    const data: any[] = [];

    return (
        <AnalysisView dataList ={data}/>
    );
};

export default Analysis;
