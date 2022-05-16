<template>
  <vs-sidebar absolute>
    <template #logo>
      <img src="../../assets/logo1.png" alt="" />
    </template>
    <vs-sidebar-item id="home">
      <template #icon>
        <unicon name="estate" fill="royalblue" />
      </template>
      Home
    </vs-sidebar-item>
    <template #footer>
      <vs-row justify="space-between">
        <vs-avatar>
          <img src="/avatars/avatar-5.png" alt="" />
        </vs-avatar>

        <vs-switch></vs-switch>>
      </vs-row>
    </template>
  </vs-sidebar>
</template>
