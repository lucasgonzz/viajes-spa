<template>
    <div
    v-if="authenticated"
    class="nav-component">
        <b-navbar 
        toggleable="lg">
            <b-navbar-brand
            :to="{name: 'Home'}">
                <img src="@/assets/logo.jpg" alt="">
            </b-navbar-brand>

            <div
            class="d-lg-none">
                <b-navbar-toggle target="nav-mobile">
                    <i class="icon-bars"></i>
                </b-navbar-toggle>
            </div>

            <b-collapse id="nav-collapse" is-nav> 
                <nav-items></nav-items>

                <b-navbar-nav class="ml-auto">

                    <b-nav-item-dropdown 
                    right>
                        <template #button-content>
                            {{ user.name }}
                        </template>
                        <b-dropdown-item 
                        :to="{name: 'Configuration'}">
                            <i class="icon-configuration"></i>
                            Configuracion
                        </b-dropdown-item>
                        <b-dropdown-item 
                        @click="logout">
                            <i class="icon-logout"></i>
                            Cerrar sesion
                        </b-dropdown-item>
                    </b-nav-item-dropdown>

                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <mobile></mobile>

    </div>
</template>
<script>
import Mobile from '@/components/nav/Mobile'
import NavItems from '@/components/nav/NavItems'

import nav from '@/mixins/nav'
export default {
    mixins: [nav],
    components: {
        Mobile,
        NavItems,
    },
}
</script>
<style lang="sass">
@import '@/sass/_custom'
$background: ''
$color: ''
@if ($nav_theme == dark) 
    $background: #343a40
    $color: #FFF
@else if ($nav_theme == ligth) 
    $background: #FFF
    $color: #000

.navbar 
    background: #FFF
    height: 70px
    padding: 0 1em !important
    background: $background

    .navbar-brand
        padding: 0
        img 
            width: 50px

    .navbar-toggler 
        border: none
        color: $color !important

    .navbar-nav 
        @media screen and (min-width: 768px)
            align-items: center

    .navbar-collapse
        justify-content: space-between

    .nav-item 
        .nav-link
            color: lighten($color, 50) !important
            @media screen and (max-width: 768px)
                text-align: left !important
                padding: .5em 1.5em
        &:hover
            .nav-link 
                font-weight: bold
    .active-item
        .nav-link 
            @media screen and (max-width: 768px)
                color: $color !important
                background: $blue !important
            @media screen and (min-width: 768px)
                color: $color !important
                font-size: 1.2em
                font-weight: bold
    .dropdown 
        a 
            color: rgba(0,0,0,.7)
</style>