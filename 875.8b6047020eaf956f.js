"use strict";(self.webpackChunkspire=self.webpackChunkspire||[]).push([[875],{5875:(K,U,l)=>{l.r(U),l.d(U,{CuentaModule:()=>V});var h=l(6814),T=l(4777),q=l(2787),f=l(5074),i=l(6223),k=l(8566),y=l(7930),w=l.n(y),N=l(3519),m=l.n(N),c=l(9347),e=l(5879),Z=l(2922),b=l(1286),j=l(3284),A=l(5843),J=l(3680),p=l(2296),u=l(4170),_=l(617),v=l(2032),C=l(6007),I=l(7466),z=l(8525);let F=(()=>{var a;class d{constructor(t,o,r,n,g){this._authService=t,this._empleadoService=o,this._departamentoService=r,this.data=n,this.formBuilder=g,this.Editor=w(),this.departamentos=[],this.empleados={},this.url=f.a.url,console.log("ID del empleado recibido:",this.data.empleId),this.token=this._authService.getToken(),this.empleadoForm=this.formBuilder.group({nombre:["",i.kI.required],apellido:["",i.kI.required],telefono:["",i.kI.required],direccion:["",i.kI.required],civil:["",i.kI.required],tiene_hijos:["",i.kI.required],pareja:["",i.kI.required],num_hijos:["",i.kI.required],nom_hijos:["",i.kI.required],fecha_contra:["",i.kI.required],nit:["",i.kI.required],dpi:["",i.kI.required],salario_base:["",i.kI.required],deparId:["",i.kI.required],foto:["",i.kI.required]})}ngOnInit(){this.id=this.data.empleId,this.obtenerEmpleadoId(this.id),this.obtener_datosDepa()}obtenerEmpleadoId(t){console.log("Obteniendo empleado por ID:",t),this._empleadoService.obtener_empleados(t,this.token).subscribe(o=>{o.data&&(this.empleados=o.data,this.empleadoForm.patchValue(this.empleados),this.imgSelect=this.url+"obtener_foto/"+this.empleados.foto)},o=>{console.error("Error al obtener el cupon:",o)})}CargarImagen(t){var o;if(t.target.files&&t.target.files[0]&&(o=t.target.files[0]).size<=4e6){if("image/png"==o.type||"image/webp"==o.type||"image/jpg"==o.type||"image/jpeg"==o.type){const r=new FileReader;r.onload=n=>this.imgSelect=r.result,console.log(this.imgSelect),r.readAsDataURL(o),this.file=o}this.file=o,this.empleadoForm.patchValue({foto:o})}}actualizar(){const t=this.empleadoForm.value,o=this.empleadoForm.get("foto").value;console.log(t),this._empleadoService.actualizar_empleado(this.id,t,o,this.token).subscribe(r=>{m().fire({title:"Se actualiz\xf3 correctamente los datos del empleado",icon:"success",confirmButtonText:"Aceptar",confirmButtonColor:"#3a8f40"}).then(n=>{n.isConfirmed&&location.reload()}),console.log("Empleado actualizado con \xe9xito:",r)},r=>{m().fire({title:"No se han actualizado los datos",icon:"error",cancelButtonText:"Cerrar",cancelButtonColor:"#e51212",showCancelButton:!0,showConfirmButton:!1}),console.error("Error al actualizar el empleado:",r)})}obtener_datosDepa(){this._departamentoService.listar_departamento(this.token).subscribe(t=>{console.log("datos obtenidos",t),this.departamentos=t},t=>{console.log("Error al obtener datos",t)})}}return(a=d).\u0275fac=function(t){return new(t||a)(e.Y36(Z.e),e.Y36(b.i),e.Y36(j._),e.Y36(c.WI),e.Y36(i.qu))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-editar-empleado"]],decls:134,vars:7,consts:[[1,"addContainer"],[1,"modalHeader"],[1,"editRowModal"],[1,"modalHeader","clearfix"],[1,"modal-about"],["mat-icon-button","","matDialogClose","","aria-label","Close dialog",1,"modal-close-button"],["mode","indeterminate","value","100"],["mat-dialog-content",""],[1,"register-form","m-4",3,"formGroup","ngSubmit"],[1,"row"],[1,"col-xl-4","col-lg-6","col-md-12","col-sm-12","mb-3"],["appearance","outline",1,"example-full-width"],["matInput","","type","text","required","","formControlName","nombre"],["matSuffix","",1,"material-icons-two-tone","color-icon","p-3"],["matInput","","type","text","required","","formControlName","apellido"],["matInput","","type","number","required","","formControlName","telefono"],[1,"col-xl-12","col-lg-12","col-md-12","col-sm-12","mb-2"],["matInput","","type","text","required","","formControlName","direccion"],[1,"col-xl-6","col-lg-6","col-md-12","col-sm-12","mb-2"],["required","","formControlName","civil"],[3,"value"],[1,"col-xl-6","col-lg-6","col-md-12","col-sm-12","mb-3"],["required","","formControlName","tiene_hijos"],["matInput","","type","text","formControlName","pareja"],["matInput","","type","number","formControlName","num_hijos"],[1,"col-xl-12","col-lg-6","col-md-12","col-sm-12","mb-3"],[2,"font-weight","400"],["formControlName","nom_hijos",3,"editor"],["matInput","","type","number","required","","formControlName","nit"],["matInput","","type","number","required","","formControlName","dpi"],[1,"col-lg-4"],[1,"col-lg-12","form-group"],[1,"custom-file"],["type","file","id","file-input",1,"custom-file-input",3,"change"],["id","input-portada","for","file-input",1,"custom-file-label",2,"white-space","nowrap","overflow","hidden"],[1,"col-lg-12"],["alt","Rounded image",1,"img-thumbnail",3,"src"],[1,"example-button-row"],["mat-raised-button","","color","primary",2,"color","white !important"],["mat-raised-button","","color","warn","tabindex","-1","matDialogClose",""]],template:function(t,o){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"h4"),e._uU(6,"Actualizar datos del empleado"),e.qZA()()()(),e._uU(7," \xa0\xa0\xa0\xa0\xa0\xa0\xa0 "),e.TgZ(8,"button",5)(9,"mat-icon"),e._uU(10,"close"),e.qZA()()(),e._UZ(11,"mat-progress-bar",6),e.TgZ(12,"div",7)(13,"form",8),e.NdJ("ngSubmit",function(){return o.actualizar()}),e.TgZ(14,"div",9)(15,"div",10)(16,"mat-form-field",11)(17,"mat-label"),e._uU(18,"Nombres"),e.qZA(),e._UZ(19,"input",12),e.TgZ(20,"mat-icon",13),e._uU(21,"face"),e.qZA(),e.TgZ(22,"mat-error"),e._uU(23," Los nombres son requeridos "),e.qZA()()(),e.TgZ(24,"div",10)(25,"mat-form-field",11)(26,"mat-label"),e._uU(27,"Apellidos"),e.qZA(),e._UZ(28,"input",14),e.TgZ(29,"mat-icon",13),e._uU(30,"face"),e.qZA(),e.TgZ(31,"mat-error"),e._uU(32," Los apellidos son requeridos "),e.qZA()()(),e.TgZ(33,"div",10)(34,"mat-form-field",11)(35,"mat-label"),e._uU(36,"Telefono"),e.qZA(),e._UZ(37,"input",15),e.TgZ(38,"mat-icon",13),e._uU(39,"call"),e.qZA(),e.TgZ(40,"mat-error"),e._uU(41," El numero de telefono es requeridos "),e.qZA()()()(),e.TgZ(42,"div",9)(43,"div",16)(44,"mat-form-field",11)(45,"mat-label"),e._uU(46,"Direccion"),e.qZA(),e._UZ(47,"textarea",17),e.TgZ(48,"mat-icon",13),e._uU(49,"add_location"),e.qZA(),e.TgZ(50,"mat-error"),e._uU(51," La Direccion es requerida "),e.qZA()()()(),e.TgZ(52,"div",9)(53,"div",18)(54,"mat-form-field",11)(55,"mat-label"),e._uU(56,"Seleccionar Estado Civil"),e.qZA(),e.TgZ(57,"mat-select",19)(58,"mat-option",20),e._uU(59,"Casado | Casada"),e.qZA(),e.TgZ(60,"mat-option",20),e._uU(61,"Soltero | Soltera"),e.qZA()(),e.TgZ(62,"mat-icon",13),e._uU(63,"favorite"),e.qZA(),e.TgZ(64,"mat-error"),e._uU(65," El estado civil es requerido "),e.qZA()()(),e.TgZ(66,"div",21)(67,"mat-radio-group",22)(68,"mat-label"),e._uU(69,"Tiene hijos?"),e.qZA(),e.TgZ(70,"mat-radio-button",20),e._uU(71,"S\xed"),e.qZA(),e.TgZ(72,"mat-radio-button",20),e._uU(73,"No"),e.qZA()()()(),e.TgZ(74,"div",9)(75,"div",21)(76,"mat-form-field",11)(77,"mat-label"),e._uU(78,"Nombre de la Pareja"),e.qZA(),e._UZ(79,"input",23),e.TgZ(80,"mat-icon",13),e._uU(81,"wc"),e.qZA(),e.TgZ(82,"mat-error"),e._uU(83," El nombre completo es requerido "),e.qZA()()(),e.TgZ(84,"div",21)(85,"mat-form-field",11)(86,"mat-label"),e._uU(87,"Numero de Hijos"),e.qZA(),e._UZ(88,"input",24),e.TgZ(89,"mat-icon",13),e._uU(90,"add_circle"),e.qZA(),e.TgZ(91,"mat-error"),e._uU(92," El nombre completo es requerido "),e.qZA()()(),e.TgZ(93,"div",9)(94,"div",25)(95,"mat-label",26),e._uU(96,"Ingrese el nombre de sus hijos"),e.qZA(),e._UZ(97,"ckeditor",27),e.qZA()()(),e._UZ(98,"br"),e.TgZ(99,"div",9)(100,"div",21)(101,"mat-form-field",11)(102,"mat-label"),e._uU(103,"NIT"),e.qZA(),e._UZ(104,"input",28),e.TgZ(105,"mat-icon",13),e._uU(106,"domain"),e.qZA(),e.TgZ(107,"mat-error"),e._uU(108," El NIT es requerido"),e.qZA()()(),e.TgZ(109,"div",21)(110,"mat-form-field",11)(111,"mat-label"),e._uU(112,"DPI"),e.qZA(),e._UZ(113,"input",29),e.TgZ(114,"mat-icon",13),e._uU(115,"contact_mail"),e.qZA(),e.TgZ(116,"mat-error"),e._uU(117," El DPI es requerido"),e.qZA()()()(),e.TgZ(118,"div",30)(119,"div",9)(120,"div",31)(121,"div",32)(122,"input",33),e.NdJ("change",function(n){return o.CargarImagen(n)}),e.qZA(),e.TgZ(123,"label",34),e._uU(124,"Seleccionar imagen"),e.qZA()()(),e.TgZ(125,"div",35),e._UZ(126,"img",36),e.qZA()()(),e.TgZ(127,"div",9)(128,"div",16)(129,"div",37)(130,"button",38),e._uU(131,"Guardar"),e.qZA(),e.TgZ(132,"button",39),e._uU(133,"Cancelar"),e.qZA()()()()()()()),2&t&&(e.xp6(13),e.Q6J("formGroup",o.empleadoForm),e.xp6(45),e.Q6J("value",!0),e.xp6(2),e.Q6J("value",!1),e.xp6(10),e.Q6J("value",!0),e.xp6(2),e.Q6J("value",!1),e.xp6(25),e.Q6J("editor",o.Editor),e.xp6(29),e.Q6J("src",o.imgSelect,e.LSH))},dependencies:[A.u,i._Y,i.Fj,i.wV,i.JJ,i.JL,i.Q7,i.sg,i.u,J.ey,p.lW,p.RK,c.ZT,c.xY,u.KE,u.hX,u.TO,u.R9,_.Hw,v.Nt,C.pW,I.VQ,I.U0,z.gD]}),d})();var x=l(4414);let D=(()=>{var a;class d{constructor(t,o,r,n,g){this._authService=t,this._usuarioService=o,this._empleadoService=r,this.data=n,this.formBuilder=g,this.hide=!0,this.empleados=[],this.usuario={},console.log("ID del usuario recibida:",this.data.usuarioId),this.token=this._authService.getToken(),this.usuarioForm=this.formBuilder.group({empleadoId:["",i.kI.required],correo:["",i.kI.required],password:["",i.kI.required],rol:["",i.kI.required]})}ngOnInit(){this.obtener_datos_empleados(),this.id=this.data.usuarioId,this.obtenerUsuarioPorId(this.id)}obtenerUsuarioPorId(t){console.log("Obteniendo usuario por ID:",t),this._usuarioService.obtener_usuario(t,this.token).subscribe(o=>{o.data&&(this.usuario=o.data,this.usuarioForm.patchValue(this.usuario))},o=>{console.error("Error al obtener el cliente:",o)})}obtener_datos_empleados(){this._empleadoService.listar_empleados(null,null,this.token).subscribe(t=>{this.empleados=t.data},t=>{console.log("Error al obtener datos",t)})}actualizar(){this.usuarioForm.valid?this._usuarioService.actualizar_usuario(this.id,this.usuarioForm.value,this.token).subscribe(o=>{m().fire({title:"Se actualiz\xf3 correctamente el usuario",icon:"success",confirmButtonText:"Aceptar",confirmButtonColor:"#3a8f40"}).then(r=>{r.isConfirmed&&location.reload()}),console.log(o)},o=>{console.log(o)}):m().fire({title:"No se han actualizado los datos",icon:"error",cancelButtonText:"Cerrar",cancelButtonColor:"#e51212",showCancelButton:!0,showConfirmButton:!1})}}return(a=d).\u0275fac=function(t){return new(t||a)(e.Y36(Z.e),e.Y36(x.i),e.Y36(b.i),e.Y36(c.WI),e.Y36(i.qu))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-editar-usuario"]],decls:40,vars:5,consts:[[1,"addContainer"],[1,"modalHeader"],[1,"editRowModal"],[1,"modalHeader","clearfix"],[1,"modal-about"],["mat-icon-button","","matDialogClose","","aria-label","Close dialog",1,"modal-close-button"],["mat-dialog-content",""],["mode","indeterminate","value","100"],[1,"register-form","m-4",3,"formGroup","ngSubmit"],[1,"row"],[1,"col-xl-6","col-lg-6","col-md-12","col-sm-12","mb-2"],["appearance","outline",1,"example-full-width"],["matInput","","type","text","placeholder","Ingrese el correo electronico","required","","formControlName","correo"],["matSuffix","",1,"material-icons-two-tone","color-icon","p-3"],["matInput","","placeholder","Ingrese su contrase\xf1a","required","","formControlName","password",3,"type"],["href","#","onClick","return false;","matSuffix","",3,"click"],["matSuffix","",1,"material-icons-two-tone","color-icon","m-3"],[1,"col-xl-12","col-lg-12","col-md-12","col-sm-12","mb-2"],[1,"example-button-row"],["mat-raised-button","","color","primary",2,"color","white !important"],["mat-raised-button","","color","warn","tabindex","-1","matDialogClose",""]],template:function(t,o){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"h4"),e._uU(6,"Editar Informacion de Usuario"),e.qZA()()()(),e.TgZ(7,"button",5)(8,"mat-icon"),e._uU(9,"close"),e.qZA()()(),e.TgZ(10,"div",6),e._UZ(11,"mat-progress-bar",7),e.TgZ(12,"form",8),e.NdJ("ngSubmit",function(){return o.actualizar()}),e.TgZ(13,"div",9)(14,"div",10)(15,"mat-form-field",11)(16,"mat-label"),e._uU(17,"Correo Electronico"),e.qZA(),e._UZ(18,"input",12),e.TgZ(19,"mat-icon",13),e._uU(20,"email"),e.qZA(),e.TgZ(21,"mat-error"),e._uU(22," Por favor ingresa tu correo "),e.qZA()()(),e.TgZ(23,"div",10)(24,"mat-form-field",11)(25,"mat-label"),e._uU(26,"Contrase\xf1a"),e.qZA(),e._UZ(27,"input",14),e.TgZ(28,"a",15),e.NdJ("click",function(){return o.hide=!o.hide}),e.TgZ(29,"mat-icon",16),e._uU(30),e.qZA()(),e.TgZ(31,"mat-error"),e._uU(32," Contrase\xf1a requerida "),e.qZA()()()(),e.TgZ(33,"div",9)(34,"div",17)(35,"div",18)(36,"button",19),e._uU(37,"Guardar"),e.qZA(),e.TgZ(38,"button",20),e._uU(39,"Cancel"),e.qZA()()()()()()()),2&t&&(e.xp6(12),e.Q6J("formGroup",o.usuarioForm),e.xp6(15),e.Q6J("type",o.hide?"password":"text"),e.xp6(1),e.uIk("aria-label","Hide password")("aria-pressed",o.hide),e.xp6(2),e.hij(" ",o.hide?"visibility_off":"visibility",""))},dependencies:[i._Y,i.Fj,i.JJ,i.JL,i.Q7,i.sg,i.u,p.lW,p.RK,c.ZT,c.xY,u.KE,u.hX,u.TO,u.R9,_.Hw,v.Nt,C.pW]}),d})();var O=l(8951),E=l(4104),B=l(2596),S=l(4064);function P(a,d){if(1&a){const s=e.EpF();e.TgZ(0,"div",26)(1,"div",27)(2,"mat-tab-group",17)(3,"mat-tab",28),e._UZ(4,"pdf-viewer",29),e.qZA(),e.TgZ(5,"mat-tab",30),e._UZ(6,"pdf-viewer",29),e.qZA(),e.TgZ(7,"mat-tab",31),e._UZ(8,"pdf-viewer",29),e.qZA()()(),e.TgZ(9,"div",32)(10,"div",33)(11,"a",34)(12,"button",35)(13,"i",15),e._uU(14,"local_printshop"),e.qZA()()(),e.TgZ(15,"a",34)(16,"button",36)(17,"i",15),e._uU(18,"local_printshop"),e.qZA()()(),e.TgZ(19,"a",34)(20,"button",37)(21,"i",15),e._uU(22,"local_printshop"),e.qZA()()(),e.TgZ(23,"button",38),e.NdJ("click",function(){const r=e.CHM(s).$implicit,n=e.oxw();return e.KtG(n.editarExpediente(r.empleadoId._id,r._id))}),e.TgZ(24,"i",15),e._uU(25,"create"),e.qZA()()()()()}if(2&a){const s=d.$implicit,t=e.oxw();e.xp6(4),e.Q6J("src",t.url+"obtener_pdf/"+s.dpi)("rotation",0)("original-size",!1)("show-all",!0)("fit-to-page",!0)("zoom",1)("zoom-scale","page-width")("stick-to-page",!1)("render-text",!0)("external-link-target","blank")("autoresize",!0)("show-borders",!1),e.xp6(2),e.Q6J("src",t.url+"obtener_pdf/"+s.penales)("rotation",0)("original-size",!1)("show-all",!0)("fit-to-page",!0)("zoom",1)("zoom-scale","page-width")("stick-to-page",!1)("render-text",!0)("external-link-target","blank")("autoresize",!0)("show-borders",!1),e.xp6(2),e.Q6J("src",t.url+"obtener_pdf/"+s.policiacos)("rotation",0)("original-size",!1)("show-all",!0)("fit-to-page",!0)("zoom",1)("zoom-scale","page-width")("stick-to-page",!1)("render-text",!0)("external-link-target","blank")("autoresize",!0)("show-borders",!1),e.xp6(3),e.uIk("href",t.url+"obtener_pdf/"+s.dpi,e.LSH),e.xp6(1),e.Q6J("hidden",0!==t.selectedTabIndex),e.xp6(3),e.uIk("href",t.url+"obtener_pdf/"+s.penales,e.LSH),e.xp6(1),e.Q6J("hidden",1!==t.selectedTabIndex),e.xp6(3),e.uIk("href",t.url+"obtener_pdf/"+s.policiacos,e.LSH),e.xp6(1),e.Q6J("hidden",2!==t.selectedTabIndex)}}const M=function(){return["Perfil"]};let Q=(()=>{var a;class d{constructor(t,o,r,n,g){this._authService=t,this._usuarioService=o,this._empleadoService=r,this._expedienteService=n,this.matDialog=g,this.usuario={},this.empleados={},this.expediente={},this.selectedTabIndex=0,this.selected=new i.p4(0),this.url=f.a.url,this.token=this._authService.getToken(),this.userId=localStorage.getItem("_id")||"",console.log(this.userId)}ngOnInit(){this.obtenerUsuarioPorId(this.userId)}obtenerUsuarioPorId(t){console.log("Obteniendo usuario por ID:",t),this._usuarioService.obtener_usuarios(t,this.token).subscribe(o=>{if(o.data&&o.data.empleadoId._id){this.usuario=o.data;const r=o.data.empleadoId._id;console.log("id empleado",r),console.log(o),this._empleadoService.obtener_empleadoss(r,this.token).subscribe(n=>{console.log(n),n.data&&(this.empleados=n.data)},n=>{console.error("Error al obtener el empleado:",n)}),this._expedienteService.obtener_expediente(r,this.token).subscribe(n=>{n.data&&(this.expediente=n.data)},n=>{console.error("Error al obtener el cupon:",n)}),this._expedienteService.listar_expediente(r,this.token).subscribe(n=>{this.expedientes=n,console.log(n),console.log(this.expedientes)},n=>{console.error("Error al obtener datos",n)})}},o=>{console.error("Error al obtener el usuario:",o)})}editarExpediente(t,o){this.matDialog.open(k.q,{data:{empleadoId:t,expeId:o}})}openEdit(t){this.matDialog.open(F,{data:{empleId:t}})}editDialog(t){this.matDialog.open(D,{data:{usuarioId:t}})}}return(a=d).\u0275fac=function(t){return new(t||a)(e.Y36(Z.e),e.Y36(x.i),e.Y36(b.i),e.Y36(O.B),e.Y36(c.uw))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-cuenta"]],decls:123,vars:25,consts:[[1,"content"],[1,"content-block"],[1,"block-header"],[3,"title","items","active_item"],[1,"row","clearfix"],[1,"col-lg-4","col-md-12"],[1,"card"],[1,"m-b-20"],[1,"contact-grid"],[1,"profile-header","bg-dark"],[1,"user-name"],[1,"name-center"],["alt","Square image",1,"user-img",3,"src"],[1,"badge","badge-solid-green"],["type","button","matTooltip","Editar Datos",1,"btn","btn-outline-success",3,"click"],[1,"material-icons"],["type","button","matTooltip","Editar Usuario",1,"btn","btn-outline-success",3,"click"],["mat-align-tabs","start"],["label","Sobre Mi"],["id","mail-nav",2,"text-align","left","padding-left","20px","padding-right","20px"],["id","online-offline",1,"online-user"],["title","Online",1,"material-icons","col-green"],["label","Datos Familiares"],[1,"col-lg-8","col-md-12"],[1,"bg-black",2,"text-align","center","padding","7px"],["class","col-lg-12 col-md-12 col-sm-12",4,"ngFor","ngForOf"],[1,"col-lg-12","col-md-12","col-sm-12"],[1,"project_widget"],["label","DPI"],[2,"width","100%","height","600px",3,"src","rotation","original-size","show-all","fit-to-page","zoom","zoom-scale","stick-to-page","render-text","external-link-target","autoresize","show-borders"],["label","Antecedentes Penales"],["label","Antecedentes Policiacos"],[1,"chat-message","clearfix",2,"padding","20px"],[1,"chat-upload"],["target","_blank"],["mat-mini-fab","","matTooltip","Imprimir Dpi",1,"bg-green","msr-2",3,"hidden"],["mat-mini-fab","","matTooltip","Imprimir Antecedentes Penales",1,"bg-green","msr-2",3,"hidden"],["mat-mini-fab","","matTooltip","Imprimir Antecedentes Policiacos",1,"bg-green","msr-2",3,"hidden"],["mat-mini-fab","","matTooltip","Editar Expediente",1,"bg-black",3,"click"]],template:function(t,o){1&t&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2),e._UZ(3,"app-breadcrumb",3),e.qZA(),e.TgZ(4,"div",4)(5,"div",5)(6,"div",6)(7,"div",7)(8,"div",8)(9,"div",9)(10,"div",10),e._uU(11),e.qZA(),e.TgZ(12,"div",11),e._uU(13),e.qZA()(),e._UZ(14,"img",12)(15,"br"),e.TgZ(16,"p",13),e._uU(17),e.qZA(),e._UZ(18,"br"),e.TgZ(19,"button",14),e.NdJ("click",function(){return o.openEdit(o.empleados._id)}),e.TgZ(20,"i",15),e._uU(21,"person"),e.qZA()(),e._uU(22,"\xa0\xa0\xa0\xa0\xa0 "),e.TgZ(23,"button",16),e.NdJ("click",function(){return o.editDialog(o.usuario._id)}),e.TgZ(24,"i",15),e._uU(25,"domain"),e.qZA()(),e.TgZ(26,"mat-tab-group",17)(27,"mat-tab",18)(28,"div",19),e._UZ(29,"br"),e.TgZ(30,"ul",20)(31,"li")(32,"i",21),e._uU(33,"brightness_1"),e.qZA(),e.TgZ(34,"strong"),e._uU(35,"Correo Electronico:"),e.qZA(),e._uU(36),e.qZA(),e._UZ(37,"hr"),e.TgZ(38,"li")(39,"i",21),e._uU(40,"brightness_1"),e.qZA(),e.TgZ(41,"strong"),e._uU(42,"Telefono:"),e.qZA(),e._uU(43),e.qZA(),e._UZ(44,"hr"),e.TgZ(45,"li")(46,"i",21),e._uU(47,"brightness_1"),e.qZA(),e.TgZ(48,"strong"),e._uU(49,"DPI:"),e.qZA(),e._uU(50),e.qZA(),e._UZ(51,"hr"),e.TgZ(52,"li")(53,"i",21),e._uU(54,"brightness_1"),e.qZA(),e.TgZ(55,"strong"),e._uU(56,"NIT:"),e.qZA(),e._uU(57),e.qZA(),e._UZ(58,"hr"),e.TgZ(59,"li")(60,"i",21),e._uU(61,"brightness_1"),e.qZA(),e.TgZ(62,"strong"),e._uU(63,"Direccion:"),e.qZA(),e._uU(64),e.qZA(),e._UZ(65,"hr"),e.TgZ(66,"li")(67,"i",21),e._uU(68,"brightness_1"),e.qZA(),e.TgZ(69,"strong"),e._uU(70,"Fecha Contratacion:"),e.qZA(),e._uU(71),e.ALo(72,"date"),e.qZA(),e._UZ(73,"hr"),e.TgZ(74,"li")(75,"i",21),e._uU(76,"brightness_1"),e.qZA(),e.TgZ(77,"strong"),e._uU(78,"Estado Civil:"),e.qZA(),e._uU(79),e.qZA(),e._UZ(80,"hr"),e.TgZ(81,"li")(82,"i",21),e._uU(83,"brightness_1"),e.qZA(),e.TgZ(84,"strong"),e._uU(85,"Salario:"),e.qZA(),e._uU(86),e.qZA()()()(),e.TgZ(87,"mat-tab",22)(88,"div",19),e._UZ(89,"br"),e.TgZ(90,"ul",20)(91,"li")(92,"i",21),e._uU(93,"brightness_1"),e.qZA(),e.TgZ(94,"strong"),e._uU(95,"Nombre Pareja:"),e.qZA(),e._uU(96),e.qZA(),e._UZ(97,"hr"),e.TgZ(98,"li")(99,"i",21),e._uU(100,"brightness_1"),e.qZA(),e.TgZ(101,"strong"),e._uU(102,"Hijos:"),e.qZA(),e._uU(103),e.qZA(),e._UZ(104,"hr"),e.TgZ(105,"li")(106,"i",21),e._uU(107,"brightness_1"),e.qZA(),e.TgZ(108,"strong"),e._uU(109,"Numero de Hijos:"),e.qZA(),e._uU(110),e.qZA(),e._UZ(111,"hr"),e.TgZ(112,"li")(113,"i",21),e._uU(114,"brightness_1"),e.qZA(),e.TgZ(115,"strong"),e._uU(116,"Nombre de los Hijos:"),e.qZA(),e._uU(117),e.qZA()()()()()()()()(),e.TgZ(118,"div",23)(119,"div",6)(120,"h4",24),e._uU(121,"EXPEDIENTE"),e.qZA(),e.YNc(122,P,26,42,"div",25),e.qZA()()()()()),2&t&&(e.xp6(3),e.Q6J("title","Mi perfil")("items",e.DdM(24,M))("active_item","Perfil"),e.xp6(8),e.AsE("",null==o.usuario.empleadoId?null:o.usuario.empleadoId.nombre," ",null==o.usuario.empleadoId?null:o.usuario.empleadoId.apellido,""),e.xp6(2),e.Oqu(null==o.empleados.deparId?null:o.empleados.deparId.titulo),e.xp6(1),e.Q6J("src",o.url+"obtener_foto/"+o.empleados.foto,e.LSH),e.xp6(3),e.Oqu(o.usuario.status),e.xp6(19),e.hij(" ",o.usuario.correo," "),e.xp6(7),e.hij(" ",o.empleados.telefono," "),e.xp6(7),e.hij(" ",o.empleados.dpi," "),e.xp6(7),e.hij(" ",o.empleados.nit," "),e.xp6(7),e.hij(" ",o.empleados.direccion," "),e.xp6(7),e.hij(" ",e.xi3(72,21,o.empleados.fecha_contra,"dd-MM-yyyy")," "),e.xp6(8),e.hij(" ",o.empleados.civil?"Casado | Casada":"Soltero | Soltera"," "),e.xp6(7),e.hij(" Q ",o.empleados.salario_base," "),e.xp6(10),e.hij(" ",o.empleados.pareja," "),e.xp6(7),e.hij(" ",o.empleados.tiene_hijos?"Si":"No"," "),e.xp6(7),e.hij(" ",o.empleados.num_hijos," "),e.xp6(7),e.hij(" ",o.empleados.nom_hijos," "),e.xp6(5),e.Q6J("ngForOf",o.expedientes))},dependencies:[h.sg,T.rQ,p.nh,E.uX,E.SP,B.gM,S.L,h.uU]}),d})();var Y=l(5133);const H=function(){return["Empresa"]},L=[{path:"",redirectTo:"cuenta",pathMatch:"full"},{path:"cuenta",component:Q},{path:"empresa",component:(()=>{var a;class d{constructor(t,o,r){this._authService=t,this._empresaService=o,this.formBuilder=r,this.hide=!0,this.empresa={},this.url=f.a.url,this.token=this._authService.getToken(),this.empresaId=localStorage.getItem("_id")||"",console.log(this.empresaId),this.empresaForm=this.formBuilder.group({nombre:["",i.kI.required],nit:["",i.kI.required],logo:["",i.kI.required],direccion:["",i.kI.required],correo:["",i.kI.required],password:["",i.kI.required],telefono:["",i.kI.required]})}ngOnInit(){this.obtenerEmpresaId(this.empresaId)}obtenerEmpresaId(t){console.log("Obteniendo expediente por ID:",t),this._empresaService.obtener_empresa(t,this.token).subscribe(o=>{o.data&&(this.empresa=o.data,console.log(o),this.empresaForm.patchValue(this.empresa),this.imgSelect=this.url+"obtener_logo/"+this.empresa.logo)},o=>{console.error("Error al obtener la empresa:",o)}),this._empresaService.datos_emleado(t,this.token).subscribe(o=>{o.data&&(this.empleados=o.data.length,console.log(o))},o=>{console.error("Error al obtener la empresa:",o)}),this._empresaService.datos_usuario(t,this.token).subscribe(o=>{o.data&&(this.usuario=o.data.length,console.log(o))},o=>{console.error("Error al obtener la empresa:",o)})}CargarImagen(t){var o;if(t.target.files&&t.target.files[0]&&(o=t.target.files[0]).size<=4e6){if("image/png"==o.type||"image/webp"==o.type||"image/jpg"==o.type||"image/jpeg"==o.type){const r=new FileReader;r.onload=n=>this.imgSelect=r.result,console.log(this.imgSelect),r.readAsDataURL(o),this.file=o}this.file=o,this.empresaForm.patchValue({logo:o})}}actualizar(){if(this.empresaForm.valid){const t=this.empresaForm.value,o=this.empresaForm.get("logo").value;this._empresaService.actualizar_empresa(this.empresaId,t,o,this.token).subscribe(r=>{m().fire({title:"Se actualiz\xf3 correctamente los datos de la empresa",icon:"success",confirmButtonText:"Aceptar",confirmButtonColor:"#3a8f40"}).then(n=>{n.isConfirmed&&location.reload()}),console.log(r)},r=>{console.log(r),m().fire({title:"No se han actualizado los datos",icon:"error",cancelButtonText:"Cerrar",cancelButtonColor:"#e51212",showCancelButton:!0,showConfirmButton:!1})})}else m().fire({title:"No se han actualizado los datos",icon:"error",cancelButtonText:"Cerrar",cancelButtonColor:"#e51212",showCancelButton:!0,showConfirmButton:!1})}}return(a=d).\u0275fac=function(t){return new(t||a)(e.Y36(Z.e),e.Y36(Y.P),e.Y36(i.qu))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-empresa"]],decls:149,vars:25,consts:[[1,"content"],[1,"content-block"],[1,"block-header"],[3,"title","items","active_item"],[1,"row","clearfix"],[1,"col-lg-4","col-md-12"],[1,"card"],[1,"m-b-20"],[1,"contact-grid"],[1,"profile-header","bg-dark"],[1,"user-name"],[1,"name-center"],["alt","Square image",1,"user-img",3,"src"],[1,"badge","badge-solid-green"],["id","mail-nav",2,"text-align","left","padding-left","20px","padding-right","20px"],["id","online-offline",1,"online-user"],["title","Online",1,"material-icons","col-green"],[1,"row"],[2,"padding-left","30px","padding-right","30px"],[1,"col-6"],[1,"progress","skill-progress",2,"margin-left","20px"],["role","progressbar","aria-valuenow","1","aria-valuemin","9","aria-valuemax",""],[1,"progress","skill-progress",2,"margin-right","20px"],[1,"col-lg-8","col-md-12"],[1,"body"],[1,"header"],[1,"example-container"],[1,"register-form","m-4",3,"formGroup","ngSubmit"],[1,"col-xl-6","col-lg-6","col-md-12","col-sm-12","mb-3"],["appearance","fill",1,"example-full-width"],["matInput","","type","text","required","","formControlName","nombre"],["matSuffix","",1,"material-icons-two-tone","color-icon","p-3"],["matInput","","type","text","required","","formControlName","direccion"],["matInput","","type","number","required","","formControlName","telefono"],["matInput","","type","number","required","","formControlName","nit"],[1,"col-xl-6","col-lg-6","col-md-12","col-sm-12","mb-2"],["matInput","","type","email","required","","formControlName","correo"],["matInput","","placeholder","Ingrese su contrase\xf1a","required","","formControlName","password",3,"type"],["href","#","onClick","return false;","matSuffix","",3,"click"],["matSuffix","",1,"material-icons-two-tone","color-icon","m-3"],[1,"col-lg-4"],[1,"col-lg-12","form-group"],[1,"badge","badge-solid-green",2,"margin-left","35px"],[1,"custom-file"],["type","file","id","file-input",1,"custom-file-input",3,"change"],["for","file-input",1,"img-preview-label"],[1,"img-wrapper"],["alt","Imagen seleccionada",1,"img-preview",3,"src"],[1,"overlay"],[1,"fas","fa-edit","edit-icon"],[1,"botonsss"],["type","submit",1,"stiloo"]],template:function(t,o){1&t&&(e.TgZ(0,"section",0)(1,"div",1)(2,"div",2),e._UZ(3,"app-breadcrumb",3),e.qZA(),e.TgZ(4,"div",4)(5,"div",5)(6,"div",6)(7,"div",7)(8,"div",8)(9,"div",9)(10,"div",10),e._uU(11),e.qZA(),e.TgZ(12,"div",11),e._uU(13),e.qZA()(),e._UZ(14,"img",12)(15,"br"),e.TgZ(16,"p",13),e._uU(17),e.qZA(),e._UZ(18,"br"),e.TgZ(19,"div",14),e._UZ(20,"br"),e.TgZ(21,"ul",15)(22,"li")(23,"i",16),e._uU(24,"brightness_1"),e.qZA(),e.TgZ(25,"strong"),e._uU(26,"Correo Electronico:"),e.qZA(),e._uU(27),e.qZA(),e._UZ(28,"hr"),e.TgZ(29,"li")(30,"i",16),e._uU(31,"brightness_1"),e.qZA(),e.TgZ(32,"strong"),e._uU(33,"Nit:"),e.qZA(),e._uU(34),e.qZA(),e._UZ(35,"hr"),e.TgZ(36,"li")(37,"i",16),e._uU(38,"brightness_1"),e.qZA(),e.TgZ(39,"strong"),e._uU(40,"Telefono:"),e.qZA(),e._uU(41),e.qZA(),e._UZ(42,"hr"),e.qZA()(),e.TgZ(43,"div",17)(44,"div",18)(45,"strong"),e._uU(46,"Numero de usuarios y empleados"),e.qZA(),e._UZ(47,"hr"),e.qZA(),e.TgZ(48,"div",19)(49,"h5",13),e._uU(50),e.qZA(),e._UZ(51,"br"),e.TgZ(52,"small"),e._uU(53,"Empleados"),e.qZA(),e.TgZ(54,"div",20),e._UZ(55,"div",21),e.qZA()(),e.TgZ(56,"div",19)(57,"h5",13),e._uU(58),e.qZA(),e._UZ(59,"br"),e.TgZ(60,"small"),e._uU(61,"Usuarios"),e.qZA(),e.TgZ(62,"div",22),e._UZ(63,"div",21),e.qZA()()()()()()(),e.TgZ(64,"div",23)(65,"div",6)(66,"div",24)(67,"div",25)(68,"h2")(69,"strong"),e._uU(70,"Configuracion"),e.qZA(),e._uU(71," de Empresa"),e.qZA()(),e.TgZ(72,"div",26)(73,"form",27),e.NdJ("ngSubmit",function(){return o.actualizar()}),e.TgZ(74,"div",17)(75,"div",28)(76,"mat-form-field",29)(77,"mat-label"),e._uU(78,"Nombre de empresa"),e.qZA(),e._UZ(79,"input",30),e.TgZ(80,"mat-icon",31),e._uU(81,"domain"),e.qZA(),e.TgZ(82,"mat-error"),e._uU(83," El nombre es requerido"),e.qZA()()(),e.TgZ(84,"div",28)(85,"mat-form-field",29)(86,"mat-label"),e._uU(87,"Direccion de empresa"),e.qZA(),e._UZ(88,"input",32),e.TgZ(89,"mat-icon",31),e._uU(90,"my_location"),e.qZA(),e.TgZ(91,"mat-error"),e._uU(92," La direccion es requerida"),e.qZA()()()(),e.TgZ(93,"div",17)(94,"div",28)(95,"mat-form-field",29)(96,"mat-label"),e._uU(97,"Telefono"),e.qZA(),e._UZ(98,"input",33),e.TgZ(99,"mat-icon",31),e._uU(100,"call"),e.qZA(),e.TgZ(101,"mat-error"),e._uU(102," El numero de telefono es requeridos "),e.qZA()()(),e.TgZ(103,"div",28)(104,"mat-form-field",29)(105,"mat-label"),e._uU(106,"NIT"),e.qZA(),e._UZ(107,"input",34),e.TgZ(108,"mat-icon",31),e._uU(109,"domain"),e.qZA(),e.TgZ(110,"mat-error"),e._uU(111," El NIT es requerido"),e.qZA()()()(),e.TgZ(112,"div",17)(113,"div",35)(114,"mat-form-field",29)(115,"mat-label"),e._uU(116,"Correo Electronico"),e.qZA(),e._UZ(117,"input",36),e.TgZ(118,"mat-icon",31),e._uU(119,"email"),e.qZA(),e.TgZ(120,"mat-error"),e._uU(121," El correo es requerido "),e.qZA()()(),e.TgZ(122,"div",35)(123,"mat-form-field",29)(124,"mat-label"),e._uU(125,"Contrase\xf1a"),e.qZA(),e._UZ(126,"input",37),e.TgZ(127,"a",38),e.NdJ("click",function(){return o.hide=!o.hide}),e.TgZ(128,"mat-icon",39),e._uU(129),e.qZA()(),e.TgZ(130,"mat-error"),e._uU(131," Contrase\xf1a requerida "),e.qZA()()()(),e.TgZ(132,"div",40)(133,"div",17)(134,"div",41)(135,"h4",42),e._uU(136,"Seleccione un logo"),e.qZA(),e._UZ(137,"br"),e.TgZ(138,"div",43)(139,"input",44),e.NdJ("change",function(n){return o.CargarImagen(n)}),e.qZA()(),e.TgZ(140,"label",45)(141,"div",46),e._UZ(142,"img",47),e.TgZ(143,"div",48),e._UZ(144,"i",49),e.qZA()()()()()(),e.TgZ(145,"div",17)(146,"div",50)(147,"button",51),e._uU(148,"Actualizar Datos"),e.qZA()()()()()()()()()()()),2&t&&(e.xp6(3),e.Q6J("title"," Datos de la Empresa")("items",e.DdM(24,H))("active_item","Empresa"),e.xp6(8),e.Oqu(o.empresa.nombre),e.xp6(2),e.Oqu(o.empresa.direccion),e.xp6(1),e.Q6J("src",o.url+"obtener_logo/"+o.empresa.logo,e.LSH),e.xp6(3),e.Oqu(o.empresa.status),e.xp6(10),e.hij(" ",o.empresa.correo," "),e.xp6(7),e.hij(" ",o.empresa.nit," "),e.xp6(7),e.hij(" ",o.empresa.telefono," "),e.xp6(9),e.Oqu(o.empleados),e.xp6(5),e.Gre("progress-bar l-bg-green width-per-",o.empleados,""),e.xp6(3),e.Oqu(o.usuario),e.xp6(5),e.Gre("progress-bar l-bg-green width-per-",o.usuario,""),e.xp6(10),e.Q6J("formGroup",o.empresaForm),e.xp6(53),e.Q6J("type",o.hide?"password":"text"),e.xp6(1),e.uIk("aria-label","Hide password")("aria-pressed",o.hide),e.xp6(2),e.hij(" ",o.hide?"visibility_off":"visibility",""),e.xp6(13),e.Q6J("src",o.imgSelect,e.LSH))},dependencies:[S.L,i._Y,i.Fj,i.wV,i.JJ,i.JL,i.Q7,i.sg,i.u,u.KE,u.hX,u.TO,u.R9,_.Hw,v.Nt],styles:['@charset "UTF-8";.img-wrapper[_ngcontent-%COMP%]{position:relative;display:inline-block;border-radius:20px;max-width:200px;max-height:200px;overflow:hidden}.custom-file-input[_ngcontent-%COMP%]{display:none}.overlay[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;background-color:#0009;display:flex;justify-content:center;align-items:center;opacity:0;transition:opacity .3s ease}.img-wrapper[_ngcontent-%COMP%]:hover   .overlay[_ngcontent-%COMP%]{opacity:1}.edit-icon[_ngcontent-%COMP%]{color:#fff;font-size:30px}.col-lg-12[_ngcontent-%COMP%]{overflow:hidden}.col-lg-12[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;height:auto;display:block}.botonsss[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}button.stiloo[_ngcontent-%COMP%]{background-color:#4caf50;color:#fff;border-radius:25px;font-size:20px!important;border:none;cursor:pointer;transition:background-color .3s ease;width:20rem!important;height:40px!important}button.stiloo[_ngcontent-%COMP%]{background-color:#252525}']}),d})()}];let R=(()=>{var a;class d{}return(a=d).\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[q.Bz.forChild(L),q.Bz]}),d})();var G=l(1858),X=l(4622);let V=(()=>{var a;class d{}return(a=d).\u0275fac=function(t){return new(t||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[h.ez,R,G.K,T.xC,A.d,X.m]}),d})()}}]);