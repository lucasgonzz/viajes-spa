export default {
	methods: {
		image(model, from_model = false, cropped = true) {
			let url 
			let image_url 
			if (!from_model) {
				image_url = model.image_url
			} else {
				image_url = model[from_model].image_url
			}
			if (image_url) {
				if (cropped) {
					url = `https://res.cloudinary.com/lucas-cn/image/upload/c_crop,g_custom/${image_url}`
				} else {
					url = `https://res.cloudinary.com/lucas-cn/image/upload/${image_url}`
				}
			} 
			return url
		},
		imageUrl(path, cropped = false) {
			let url
			if (cropped) {
				url = `https://res.cloudinary.com/lucas-cn/image/upload/c_crop,g_custom/${path}`
			} else {
				url = `https://res.cloudinary.com/lucas-cn/image/upload/${path}`
			}
			return url
		},
		uploadImage(model_name, model) {
			this.$store.commit('auth/setLoading', true)
			setTimeout(() => {
				this.$store.commit('auth/setLoading', false)
			}, 2000)
			var myCropWidget = cloudinary.createUploadWidget(this.widget_info, (error, result) => { 
				if (result.event == 'success') {
					let image_url = result.info.path
					this.$api.put(`/${model_name.replace('_', '-')}s/image/${model.id}`, {
						image_url
					})
					.then(res => {
						this.$store.commit(this.modelPlural(model_name)+'/add', res.data[model_name])
					})
					.catch(err => {
						console.log(err)
						this.$toast.error('Error al guardar imagen')
					})
				}
			})
			myCropWidget.open()
		},
	},
	computed: {
		widget_info() {
			return {
				cloudName: 'lucas-cn', 
				uploadPreset: 'my_preset',
				sources: ['image_search', 'instagram', 'local','camera', 'facebook', 'google_drive'],
				googleApiKey: 'AIzaSyD10kzclyxnd_mSdMkgxXZJCoMsKJu8T6U',
				searchByRights: true,
				cropping: true,
				cropping_aspect_ratio: 1, 
				showSkipCropButton: false,
				language: "en",  
				text: {
					"en": {
						"or": "O",
						"back": "Atras",
						"advanced": "Avanzado",
						"close": "Cerrar",
						"no_results": "Sin resultados",
						"search_placeholder": "Buscar archivos",
						"about_uw": "Sobre el widget",
						"menu": {
							"files": "Mis archivos",
							"web": "Direccion Web",
							"camera": "Camara",
							"gdrive": "Google Drive",
							"facebook": "Facebook",
							"instagram": "Instagram",
							"image_search": "Internet",
						},
						"crop": {
							"title": "Cortar",
							"crop_btn": "Cortar",
							"skip_btn": "Omitir",
							"reset_btn": "Resetear",
							"close_btn": "Si",
							"close_prompt": "Cancelar la subida?",
							"image_error": "Error cargando la imagen",
							"corner_tooltip": "Arrastra la esquina para cambiar el tamaño",
							"handle_tooltip": "Arrastra la manija para cambiar el tamaño"
						},
						"local": {
							"browse": "Busca en tu pc",
							"main_title": "Subir archivos",
							"dd_title_single": "Arrastra la imagen aqui",
							"dd_title_multi": "Arrastra las imagenes aqui",
							"drop_title_single": "Solta el archivo aqui",
							"drop_title_multiple": "Solta los archivos aqui"
						},
			            "instagram": {
			                "no_auth_title": "Subi fotos desde tu cuenta de Instagram",
			                "no_auth_action": "Conectar a Instagram",
			                "header_title": "Tus ultimas fotos de Instagram",
			                "authenticating": "Autenticando"
			            },
			            "image_search": {
			                "main_title": "Buscar imagenes",
			                "inputPlaceholder": "Ingrese el codigo o nombre del artículo",
			                "customPlaceholder": "Search {{site}}",
			                "show_options": "Mostrar opciones",
			                "hide_options": "Cerrar opciones",
			                "filters_title": "Sitio",
			                "all": "Todo",
			                "rights": "Usage rights:",
			                "rights_options": {
			                    "not_filtered": "not filtered by licence",
			                    "free": "free to use or share",
			                    "free_com": "free to use or share, even commercially",
			                    "free_mod": "free to use share or modify",
			                    "free_mod_com": "free to use, share or modify, even commercially"
			                },
			                "search_error": "Error al buscar, intente denuevo por favor."
			            },
			            "queue": {
			                "title": "Fila para subir",
			                "title_uploading_with_counter": "Subiendo {{num}} fotos",
			                "title_uploading": "Subiendo archivos",
			                "mini_title": "Subido",
			                "mini_title_uploading": "Subiendo",
			                "show_completed": "Subida completada",
			                "retry_failed": "Reintento fallido",
			                "abort_all": "Abandonar todo",
			                "upload_more": "Subir mas",
			                "done": "Listo",
			                "mini_upload_count": "{{num}} sibidos",
			                "mini_failed": "{{num}} fallidas",
			                "statuses": {
			                    "uploading": "Subiedno...",
			                    "error": "Error",
			                    "uploaded": "Listo",
			                    "aborted": "Abandonado"
			                }
			            },
					}
  				},
				styles: {
					palette: {
						window: "#FFF",
						windowBorder: this.variant_color,
						tabIcon: this.variant_color,
						menuIcons: this.variant_color,
						textDark: this.variant_color,
						textLight: "#FFFFFF",
						link:  this.variant_color,
						action:  this.variant_color,
						inactiveTabIcon: this.variant_color,
						error: "#e3342f",
						inProgress: this.variant_color,
						complete: this.variant_color,
						sourceBg: "#FFF"
					},
					fonts: {
						"'Nunito', cursive": "https://fonts.googleapis.com/css?family=Nunito",
					},
				},
			}
		},
	},
}