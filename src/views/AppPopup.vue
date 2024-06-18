<template>
    <transition name="fade">
      <div v-if="visible" class="popup">
        {{ message }}
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    name: 'AppPopup',
    props: {
      message: String,
      visible: Boolean
    }
  };
  </script>
  
  <style scoped>
  .popup {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #f8d7da;
    color: #721c24;
    padding: 1rem;
    border: 1px solid #f5c6cb;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>
  