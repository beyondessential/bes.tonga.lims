!function(e){var t={};function i(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/++plone++palau.lims.static/bundles",i(i.s=4)}([function(e,t){e.exports=jQuery},function(e,t,i){"use strict";(function(e){var i,n=function(e,t){return function(){return e.apply(t,arguments)}},r=[].indexOf||function(e){for(var t=0,i=this.length;t<i;t++)if(t in this&&this[t]===e)return t;return-1};i=function(){function t(){var t,i,o,s;if(this.debug=n(this.debug,this),this.get_portal_url=n(this.get_portal_url,this),this.ajax_submit=n(this.ajax_submit,this),this.fetch=n(this.fetch,this),this.set_visible=n(this.set_visible,this),this.round=n(this.round,this),this.get_float_value=n(this.get_float_value,this),this.calculate_volume=n(this.calculate_volume,this),this.set_volume_readonly=n(this.set_volume_readonly,this),this.toggle_container_visibility=n(this.toggle_container_visibility,this),this.update_container=n(this.update_container,this),this.get_sample_index=n(this.get_sample_index,this),this.on_sample_type_selected=n(this.on_sample_type_selected,this),this.on_bottle_container_blur=n(this.on_bottle_container_blur,this),this.on_bottle_weight_change=n(this.on_bottle_weight_change,this),this.on_template_selected=n(this.on_template_selected,this),this.bind_event_handler=n(this.bind_event_handler,this),this.is_required=n(this.is_required,this),this.is_required()){if(this.debug("load"),this.sample_type_selector="input[id^='SampleType']",this.template_selector="input[id^='Template']",this.bottle_weights_selector="input[id^='Bottles-'][id*='-Weight-']",this.bottle_containers_selector="input[id^='Bottles-'][id*='-Container-']",this.bind_event_handler(),r.call(document.body.classList,"template-ar_add")>=0)for(i=0,o=(s=document.querySelectorAll(this.sample_type_selector)).length;i<o;i++)t=s[i],e(t).trigger("selected");else document.querySelector("div[data-fieldname='Bottles']")&&(t=document.querySelector("input[id='Volume']")).setAttribute("readonly","readonly");return this}}return t.prototype.is_required=function(){var e,t,i,n,r,o;for(o=["template-ar_add","portaltype-analysisrequest"],t=i=0,n=(r=document.body.classList).length;i<n;t=++i)if(e=r[t],o.includes(e))return!0;return!1},t.prototype.bind_event_handler=function(){return this.debug("bind_event_handler"),e("body").on("selected",this.sample_type_selector,this.on_sample_type_selected),e("body").on("selected",this.template_selector,this.on_template_selected),e("body").on("blur",this.bottle_containers_selector,this.on_bottle_container_blur),e("body").on("change",this.bottle_weights_selector,this.on_bottle_weight_change)},t.prototype.on_template_selected=function(t){var i,n,r;if(this.debug("on_template_selected"),i=t.currentTarget,n=this.get_sample_index(i),r=e("#"+i.id).attr("uid"))return this.fetch(r,[]).done((function(e){var t;if(e)return t=e.SampleType_uid,this.update_container(n,t)}))},t.prototype.on_bottle_weight_change=function(e){var t,i;return this.debug("on_bottle_weight_change"),t=e.currentTarget,i=this.get_sample_index(t),this.calculate_volume(i)},t.prototype.on_bottle_container_blur=function(e){var t,i;return this.debug("on_bottle_container_blur"),t=e.currentTarget,i=this.get_sample_index(t),this.calculate_volume(i)},t.prototype.on_sample_type_selected=function(t){var i,n,r;return this.debug("on_sample_type_selected"),i=t.currentTarget,n=this.get_sample_index(i),r=e("#"+i.id).attr("uid"),this.update_container(n,r)},t.prototype.get_sample_index=function(t){var i;return this.debug("get_sample_index:element="+t.id),(i=t.closest("td[arnum]"))?e(i).attr("arnum"):null},t.prototype.update_container=function(e,t){return this.debug("update_container:sample_index="+e+",sample_type_uid="+t),t?("ContainerWidget",this.fetch(t,"ContainerWidget").done((function(t){var i;if(i=!1,t&&(i="container"===t.ContainerWidget),this.toggle_container_visibility(e,i),this.set_volume_readonly(e,!i),!i)return this.calculate_volume(e)}))):(this.toggle_container_visibility(e,!0),this.set_volume_readonly(e,!1))},t.prototype.toggle_container_visibility=function(e,t){return this.debug("toggle_container_visibility:sample_index="+e+",show_container="+t),this.set_visible("Container",e,t),this.set_visible("Bottles",e,!t)},t.prototype.set_volume_readonly=function(e,t){var i,n;return this.debug("set_volume_readonly:sample_index="+e+",readonly="+t),n="#Volume",e&&(n="#Volume-"+e),i=document.querySelector(n),t?i.setAttribute("readonly","readonly"):i.removeAttribute("readonly")},t.prototype.calculate_volume=function(t){var i,n,r,o,s;return this.debug("calculate_volume:sample_index="+t),o=0,n="tr.records_row_Bottles",t&&(n="tr.records_row_Bottles-"+t),i=document.querySelectorAll(n),r=this,e.each(i,(function(e,i){var n,s,l,u,a,c;return c="#Bottles-Weight-"+e,t&&(c="#Bottles-"+t+"-Weight-"+e),a=i.querySelector(c),a=r.get_float_value(a),r.debug("Not a valid volume: "+a),s="#Bottles-DryWeight-"+e,t&&(s="#Bottles-"+t+"-DryWeight-"+e),n=i.querySelector(s),n=r.get_float_value(n),r.debug("Not a valid volume: "+n),(l=a-n)<=0?(r.debug("Not a valid bottle volume: "+l),l=""):(l=r.round(1.05*l,3),o+=l),u="#Bottles-Volume-"+e,t&&(u="#Bottles-"+t+"-Volume-"+e),i.querySelector(u).value=l})),o=parseFloat(o),(o=this.round(o,4))<=0?(this.debug("Not a valid volume: "+o),o=""):o+=" ml",s="#Volume",t&&(s="#Volume-"+t),document.querySelector(s).value=o},t.prototype.get_float_value=function(e,t){var i;return null==t&&(t=0),i=parseFloat(e.value),isNaN(i)&&(i=parseFloat(t)),i},t.prototype.round=function(e,t){return null==t&&(t=2),Number(Math.round(e+"e"+t)+"e-"+t)},t.prototype.set_visible=function(t,i,n){var r,o;return this.debug("set_visible:field_name="+t+",sample_index="+i+",visible="+n),o="div[data-fieldname='"+t+"']",i&&(o="div[data-fieldname='"+t+"-"+i+"']"),"0"===i&&"1"===document.querySelector("#ar_count").value&&(o="tr[fieldname="+t+"]"),r=document.querySelector(o),n?e(r).show():e(r).hide()},t.prototype.fetch=function(t,i){var n,r;return this.debug("fetch:uid="+t+",field_names="+i),n=e.Deferred(),r={url:this.get_portal_url()+"/@@API/read",data:{catalog_name:"senaite_catalog_setup",UID:t,include_fields:i,page_size:1}},this.ajax_submit(r).done((function(e){var t;return t={},e.objects&&(t=e.objects[0]),n.resolveWith(this,[t])})),n.promise()},t.prototype.ajax_submit=function(t){var i;return null==t&&(t={}),this.debug("ajax_submit"),null==t.type&&(t.type="POST"),null==t.url&&(t.url=this.get_portal_url()),null==t.context&&(t.context=this),null==t.dataType&&(t.dataType="json"),null==t.data&&(t.data={}),null==t._authenticator&&(t._authenticator=e("input[name='_authenticator']").val()),this.debug(">>> ajax_submit::options=",t),e(this).trigger("ajax:submit:start"),i=function(){return e(this).trigger("ajax:submit:end")},e.ajax(t).done(i)},t.prototype.get_portal_url=function(){return e("input[name=portal_url]").val()||window.portal_url},t.prototype.debug=function(e){return console.debug("[palau.lims]","SampleTypeController::"+e)},t}(),t.a=i}).call(this,i(0))},function(e,t,i){"use strict";(function(e){var i,n=function(e,t){return function(){return e.apply(t,arguments)}};i=function(){function t(){var t,i,r,o;if(this.debug=n(this.debug,this),this.init_sections_visibility=n(this.init_sections_visibility,this),this.init_toggle=n(this.init_toggle,this),this.on_toggle_selector_clicked=n(this.on_toggle_selector_clicked,this),this.is_required=n(this.is_required,this),this.is_required()){for(this.debug("load"),t=0,i=(o=[["#content h1","#senaite-sampleheader","png-lims-sample-header"],["#content h1","div[id=ar-attachments]","png-lims-sample-header"],["div.remarks-widget h3","div.remarks-widget div","png-lims-sample-remarks-section"],["div.analysis-listing-table h3","div.analysis-listing-table form","png-lims-sample-analyses-section"],["div[id=results-interpretation] h3","div[id=results-interpretation] form","png-lims-sample-results-interpretation-section"]]).length;t<i;t++)r=o[t],this.init_toggle(r[0],r[1],r[2]);return e("body").on("click",".toggle_selector",this.on_toggle_selector_clicked),this.init_sections_visibility(),this}}return t.prototype.is_required=function(){var e,t,i,n,r,o;for(o=["portaltype-analysisrequest"],t=i=0,n=(r=document.body.classList).length;i<n;t=++i)if(e=r[t],o.includes(e))return!0;return!1},t.prototype.on_toggle_selector_clicked=function(t){var i,n,r,o,s,l;for(this.debug("on_toggle_selector_clicked"),o=t.currentTarget.getAttribute("target-section"),i=0,n=(s=document.querySelectorAll("[section="+o+"]")).length;i<n;i++)r=s[i],(l=this.is_visible(r))?e(r).hide():e(r).show();return site.set_cookie(o,!l)},t.prototype.init_toggle=function(e,t,i){var n;return this.debug("init_toggle:anchor_selector='"+e+"',section_selector='"+t+"',section_id='"+i+"'"),(n=document.querySelector(e)).classList.add("toggle_selector"),n.setAttribute("target-section",i),document.querySelector(t).setAttribute("section",i)},t.prototype.is_visible=function(t){return"none"!==e(t).css("display")},t.prototype.init_sections_visibility=function(){var t,i,n,r,o,s,l,u;for(this.debug("set_visibility"),".toggle_selector",r=[],i=0,n=(t=document.querySelectorAll(".toggle_selector")).length;i<n;i++)s=t[i].getAttribute("target-section"),u=site.read_cookie(s)||"true",this.debug("section_id="+s+", visible="+u),u="true"===u,l=document.querySelectorAll("[section="+s+"]"),r.push(function(){var t,i,n;for(n=[],t=0,i=l.length;t<i;t++)o=l[t],u?n.push(e(o).show()):n.push(e(o).hide());return n}());return r},t.prototype.debug=function(e){return console.debug("[palau.lims]","SampleViewLayoutController::"+e)},t}(),t.a=i}).call(this,i(0))},function(e,t,i){"use strict";(function(e){var i,n=function(e,t){return function(){return e.apply(t,arguments)}};i=function(){function t(){var t,i,r,o;if(this.on_reference_other_selector_change=n(this.on_reference_other_selector_change,this),this.bind_event_handler=n(this.bind_event_handler,this),this.is_required=n(this.is_required,this),this.is_required()){for(this.reference_other_selector="input.reference-otherfield-check",this.bind_event_handler(),i=0,r=(o=document.querySelectorAll(this.reference_other_selector)).length;i<r;i++)t=o[i],e(t).trigger("change");return this}}return t.prototype.is_required=function(){var e,t,i,n,r,o;for(o=["template-ar_add","portaltype-analysisrequest"],t=i=0,n=(r=document.body.classList).length;i<n;t=++i)if(e=r[t],o.includes(e))return!0;return!1},t.prototype.bind_event_handler=function(){return e("body").on("change",this.reference_other_selector,this.on_reference_other_selector_change)},t.prototype.on_reference_other_selector_change=function(t){var i,n,r;return i=t.currentTarget,r=e(i).attr("data_target"),n=document.querySelector("#"+r),i.checked?e(n).show():(e(n).hide(),e(n).val(""))},t}(),t.a=i}).call(this,i(0))},function(e,t,i){i(5),e.exports=i(6)},function(e,t,i){"use strict";i.r(t);var n=i(1),r=i(2),o=i(3);document.addEventListener("DOMContentLoaded",(function(){console.debug("*** PALAU LIMS JS LOADED ***"),window.sampletype_container=new n.a,window.sampleview_layout=new r.a,window.reference_other=new o.a}))},function(e,t,i){}]);