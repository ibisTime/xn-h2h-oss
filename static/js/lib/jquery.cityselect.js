/*
 * 解析xml实现省市区三级联动
 *
 *日期：2017-06-09
 *
 *settings 参数说明
 *onlyProvince 是否只显示省的数据
 *-----
 *url:省市数据xml文件路径
 *nodata:无数据状态
 *required:必选项
------------------------------ */
(function($) {
  $.fn.citySelect = function(settings, onlyProvince) {
    if (this.length < 1) {
      return;
    };

    // 默认值
    settings = $.extend({
      url: __uri('./province_data.xml'),
      prov: null,
      city: null,
      dist: null,
      nodata: null,
      required: true
    }, settings);

    var box_obj = this;
    var prov_obj = box_obj.find(".prov");
    var city_obj = box_obj.find(".city");
    var dist_obj = box_obj.find(".dist");
    var prov_val = settings.prov;
    var city_val = settings.city;
    var dist_val = settings.dist;
    var select_prehtml = (settings.required) ? "" : "<option value=''>请选择</option>";

    var $provinceXmlElements;
    var $cityXmlELements;
    var $districtXmlELements;
    var docXml;

    $.get(settings.url, function(xml) {
      docXml = xml; //解析xml
      getProvince();
      //如果不是只要省的数据
      if (!onlyProvince) {
        setTimeout(function() {
          if (settings.prov != null) {
            prov_obj.val(settings.prov);
            getCity();
            setTimeout(function() {
              if (settings.city != null) {
                city_obj.val(settings.city);
                getDistrict();
                setTimeout(function() {
                  if (settings.dist != null) {
                    dist_obj.val(settings.dist);
                  };
                }, 1);
              };
            }, 1);
          };
        }, 1);
      }
    });

    function getProvince() { //获取省数据
      //在jquery中使用标签名来查找对应标签，利用find()方法，传入标签名
      $provinceXmlElements = $(docXml).find("province");

      var temp_html = select_prehtml;

      $provinceXmlElements.each(function(i, d) {

        temp_html += "<option value='" + $(d).attr("name") + "'>" + $(d).attr("name") + "</option>";

      });

      prov_obj.html(temp_html);
    }

    function getCity(val) { //获取市数据

      var temp_html = select_prehtml;

      $provinceXmlElements.each(function(i, d) {

        var $provinceXmlValue = $(d).attr("name"); //遍历的省

        if (val == $provinceXmlValue) {

          $cityXmlELements = $(d).find("city"); //选中的省下面的市

          $cityXmlELements.each(function(index, domEle) {

            var $cityXmlValue = $(domEle).attr("name");

            temp_html += "<option value='" + $cityXmlValue + "'>" + $cityXmlValue + "</option>";

          });
        }
      });

      city_obj.html(temp_html);

    }

    function getDistrict(val) { //获取区数据

      var temp_html = select_prehtml;

      if ($cityXmlELements) {
        $cityXmlELements.each(function(i, d) {

          var $cityXmlValue = $(d).attr("name"); //遍历的省

          if (val == $cityXmlValue) {

            $districtXmlELements = $(d).find("district"); //选中的省下面的市

            $districtXmlELements.each(function(index, domEle) {

              var $districtXmlValue = $(domEle).attr("name");

              temp_html += "<option value='" + $districtXmlValue + "'>" + $districtXmlValue + "</option>";

            });
          }
        });
      }

      dist_obj.html(temp_html);

    }

    prov_obj.bind("change", function() {
      var $provinceValue = prov_obj.val(); //选中的省

      //清空
      city_obj.empty();
      dist_obj.empty();
      dist_obj.trigger('chosen:updated');

      if (!onlyProvince) {
        getCity($provinceValue);
      }
    });

    city_obj.bind("change", function() {
      var $cityValue = city_obj.val();

      //清空
      dist_obj.empty();

      getDistrict($cityValue)
    });

  };
})(jQuery);
