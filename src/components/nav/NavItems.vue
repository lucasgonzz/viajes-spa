<template>
	<b-navbar-nav>
		<template>

		    <b-nav-item 
		    v-for="route in routes"
		    class="apretable"
		    :class="isActiveRoute(route)"
		    @click="setRoute(route)">
		    	{{ route.text }}
			</b-nav-item>

		</template>
	</b-navbar-nav>
</template>
<script>
import nav from '@/mixins/nav'
export default {
	mixins: [nav],
}
</script>