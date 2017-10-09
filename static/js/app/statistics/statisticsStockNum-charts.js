$(function() {
    var chart={
	    title : '每日分红',//图标名称
	    legendData:['消费者分红总额','商家分红总额','礼品商分红总额'],//图例组件的类名
	    seriesDataName:['userAmount','storeAmount','lpstoreAmount'],//内容数据的名称,与图例组件的类名对应
	    toolboxShow: true,//是否显示工具栏
	    toolbox: {//工具栏
	        featureDataView : false,//是否显示数据视图工具
	        featureMagicType : true,//是否显示动态类型
	        featureRestore : true,//是否显示配置还原
	        featureSaveAsImage : true//是否显示保存图片。
	    },
	    xAxisData: 'totalDatetime',//x轴类目数据的名称
	    yAxisName: '元',//x轴类目数据的名称
	    seriesType:'line',//默认展示的图表类型
	    seriesDataType: 'amount',// 内容是否是amount
	    seriesUnit: '元',// 内容是否是amount
	    dataZoomStart: 0,//数据窗口范围的起始百分比
	    dataZoomEnd: 100//数据窗口范围的结束百分比
	};
	
	var searchs =[{
        field: 'totalDatetime',
        title: '日期',
        twoDate: true,
		field1: 'totalDatetimeStart',
		title1: '日期',
		type1: "date",
		field2: 'totalDatetimeEnd',
		type2: "date",
		search: true,
        formatter: dateTimeFormat
	}]

    buildCharts({
        chart: chart,
        type:'line',
        searchs: searchs,
        pageCode: '808801',
        searchParams: {
        	orderColumn: 'total_datetime',
        	orderDir: 'Asc',
        	companyCode: OSS.company
		}
    });
})