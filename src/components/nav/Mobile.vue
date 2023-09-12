<template>
<b-sidebar
id="nav-mobile" 
shadow>

	<nav-items></nav-items>

    <div
    class="nav-item apretable"
    :to="{name: 'Configuration'}">
    	<a
    	class="nav-link">
    		Configuracion
    	</a>
    </div>
    <div
    class="nav-item apretable"
    @click="logout">
    	<a
    	class="nav-link">
    		Cerrar sesion
    	</a>
    </div>
    
</b-sidebar>
</template>
<script>
import NavItems from '@/components/nav/NavItems'

import nav from '@/mixins/nav'
export default {
	mixins: [nav],
	components: {
		NavItems,
	},
}
</script>
<style lang="sass">
@import '@/sass/_custom'
#nav-mobile
	img 
		width: 50px
	button
		box-shadow: none
	a 
		text-align: left
		padding-left: 2em
	.active-item
		.nav-link 
			color: #FFF !important
			background: $blue !important
</style>