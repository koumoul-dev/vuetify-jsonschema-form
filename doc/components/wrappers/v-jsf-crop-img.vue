<template>
  <!-- using vuetify's generic component v-input is handy for homogeneous labels, validation, etc. -->
  <v-input
    :value="value"
    :name="fullKey"
    :label="label"
    :disabled="disabled"
    :rules="rules"
    :required="required"
    class="vjsf-crop-img"
  >
    <v-icon v-if="!disabled && !required && !!value" style="position: absolute; right: 0;" @click="on.input(null)">
      mdi-close
    </v-icon>
    <v-row class="mt-0 mx-0">
      <v-avatar v-if="value" class="mt-1">
        <img :src="value">
      </v-avatar>
      <v-file-input
        v-if="!disabled"
        v-model="file"
        type="file"
        class="pt-2"
        accept="image/png, image/jpeg"
        placeholder="load a new image"
        @change="change"
      >
        <template v-slot:append-outer>
          <v-btn v-if="imgSrc" fab x-small color="accent" @click="validate">
            <v-icon>
              mdi-check
            </v-icon>
          </v-btn>
        </template>
      </v-file-input>
    </v-row>
    <vue-cropper
      v-if="file"
      ref="cropper"
      v-bind="cropperOptions"
      :src="imgSrc"
      alt="Avatar"
    />
  </v-input>
</template>

<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  components: { VueCropper },
  // available props are the contextual elements passed by v-jsf to its slots
  props: {
    value: { type: String, default: '' },
    options: { type: Object, required: true },
    schema: { type: Object, required: true },
    fullSchema: { type: Object, required: true },
    fullKey: { type: String, required: true },
    label: { type: String, default: '' },
    htmlDescription: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    rules: { type: Array, required: true },
    on: { type: Object, required: true },
    // and a few other
    cropperOptions: { type: Object, default: () => ({ aspectRatio: 1, autoCrop: true }) },
    size: { type: Number, default: 48 } // same as default v-avatar size
  },
  data: () => ({
    file: null,
    imgSrc: null
  }),
  computed: {},
  methods: {
    change() {
      if (!this.file) {
        this.imgSrc = null
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        this.imgSrc = event.target.result
        this.dialog = true
        this.$refs.cropper.replace(this.imgSrc)
      }
      reader.readAsDataURL(this.file)
    },
    async validate() {
      const croppedImg = this.$refs.cropper
        .getCroppedCanvas({ width: this.size, height: this.size })
        .toDataURL('image/png')
      this.on.input(croppedImg)
      this.file = null
      this.imgSrc = null
    }
  }
}
</script>

<style lang="css">
.vjsf-crop-img>.v-input__control>.v-input__slot {
  display: block;
}
</style>
