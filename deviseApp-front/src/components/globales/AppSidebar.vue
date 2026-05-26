<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@/composable/useAuth'
import { useAuthStore } from '@/stores/authStore'

const route    = useRoute()
const { logout, user } = useAuth()
const useStore = useAuthStore()

const navLinks = [
  { name: 'Quotes',     path: '/devis',     icon: 'fas fa-file-invoice-dollar' },
  { name: 'Customers',  path: '/customers', icon: 'fas fa-user', permission: 'index_customer' },
  { name: 'Users',      path: '/users',     icon: 'fas fa-users', permission: 'gestion_user' },
  { name: 'Settings',   path: '/settings',  icon: 'fas fa-cog' },
]

const isOpen = ref(false)

const isActive = (path) => route.path.startsWith(path)

watch(route, () => { isOpen.value = false })
</script>

<template>
  <Teleport to="body">
    <Transition name="backdrop">
      <div v-if="isOpen" class="backdrop" @click="isOpen = false" />
    </Transition>
  </Teleport>

  <aside class="sidebar" :class="{ 'is-open': isOpen }">

    <div class="sidebar-header">
      <div class="logo">
        <span class="logo-text">DevisApp</span>
      </div>
      <button
        class="hamburger"
        :aria-label="isOpen ? 'Close menu' : 'Open menu'"
        @click="isOpen = !isOpen"
      >
        <span class="bar" />
        <span class="bar" />
        <span class="bar" />
      </button>
    </div>

    <nav class="nav" @click="isOpen = false">
      <template v-for="link in navLinks" :key="link.path">
        <router-link
          v-if="!link.permission || useStore.permission({ permission: link.permission })"
          :to="link.path"
          :title="link.name"
          :class="['nav-link', { active: isActive(link.path) }]"
        >
          <i :class="link.icon" class="nav-icon" />
          <span class="nav-label">{{ link.name }}</span>
        </router-link>
      </template>
    </nav>

    <div class="sidebar-footer">
      <div class="user-info">
        <div class="user-avatar">
          {{ user?.name?.charAt(0).toUpperCase() }}
        </div>
        <div class="user-details">
          <p class="user-name">{{ user?.name }}</p>
          <p class="user-email">{{ user?.email }}</p>
        </div>
      </div>
      <button class="logout-btn" @click="logout">
        <i class="fas fa-sign-out-alt" />
        <span class="logout-label">Log out</span>
      </button>
    </div>

  </aside>
</template>

<style scoped>
.sidebar {
    width: var(--sidebar-w);
    height: 100vh;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    background: var(--sidebar-bg);
    border-right: 1px solid var(--sidebar-border);
    padding: var(--s-xl) var(--s-lg);
    overflow-y: auto;
    position: sticky;
    top: 0;
}

.sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--s-2xl);
}

.logo {
    display: flex;
    align-items: center;
    gap: var(--s-sm);
    overflow: hidden;
}

.logo-text {
    font-size: var(--f-lg);
    font-weight: var(--f-bold);
    color: var(--text);
    white-space: nowrap;
}

.hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--s-xs);
    border-radius: var(--r-md);
    flex-shrink: 0;
}

.hamburger:hover { background: var(--bg-gray); }

.bar {
    display: block;
    width: 20px;
    height: 2px;
    background: var(--text);
    border-radius: var(--r-full);
    transform-origin: center;
    transition: transform 0.28s ease, opacity 0.2s ease;
}

.is-open .bar:nth-child(1) {
   transform: translateY(7px) rotate(45deg);
   }
.is-open .bar:nth-child(2) { 
  opacity: 0; transform: scaleX(0); 
}
.is-open .bar:nth-child(3) { 
  transform: translateY(-7px) rotate(-45deg); 
}


.nav {
    display: flex;
    flex-direction: column;
    gap: var(--s-xs);
    flex: 1;
}

.nav-link {
    display: flex;
    align-items: center;
    gap: var(--s-md);
    padding: var(--s-sm) var(--s-md);
    border-radius: var(--r-md);
    font-size: var(--f-base);
    color: var(--text-2);
    text-decoration: none;
    white-space: nowrap;
    transition: background var(--transition), color var(--transition);
}

.nav-link:hover { background: var(--bg-gray); color: var(--text); }

.nav-link.active {
    background: var(--primary-light);
    color: var(--primary);
    font-weight: var(--f-medium);
}

.nav-icon {
    font-size: var(--f-lg);
    width: 18px;
    text-align: center;
    flex-shrink: 0;
}

.sidebar-footer {
    border-top: 1px solid var(--border);
    padding-top: var(--s-lg);
    margin-top: var(--s-lg);
}

.user-info {
    display: flex;
    align-items: center;
    gap: var(--s-sm);
    margin-bottom: var(--s-md);
    overflow: hidden;
}

.user-avatar {
    width: 34px;
    height: 34px;
    border-radius: var(--r-full);
    background: var(--primary-light);
    color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--f-base);
    font-weight: var(--f-bold);
    flex-shrink: 0;
}

.user-details {
    flex: 1;
    overflow: hidden;
}

.user-name {
    font-size: var(--f-md);
    font-weight: var(--f-medium);
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.user-email {
    font-size: var(--f-xs);
    color: var(--text-3);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--s-sm);
    width: 100%;
    padding: var(--s-sm);
    background: none;
    border: 1px solid var(--border);
    border-radius: var(--r-md);
    font-size: var(--f-md);
    color: var(--danger);
    cursor: pointer;
    transition: background var(--transition);
}

.logout-btn:hover { background: var(--danger-light); }

.backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    z-index: 240;
}

.backdrop-enter-active,
.backdrop-leave-active { transition: opacity 0.25s ease; }
.backdrop-enter-from,
.backdrop-leave-to { opacity: 0; }

@media (min-width: 768px) and (max-width: 1023px) {
    .sidebar {
        width: var(--sidebar-collapsed-w);
        padding: var(--s-xl) var(--s-sm);
        align-items: center;
    }

    .sidebar-header {
        justify-content: center;
        width: 100%;
    }

    .logo-text, .nav-label, .user-details, .logout-label{ 
      display: none; 
    }

    .nav-link {
        justify-content: center;
        padding: var(--s-sm);
    }

    .user-info  { justify-content: center; }
    .logout-btn { padding: var(--s-sm); }
}

@media (max-width: 767px) {
    .sidebar {
        width: 100%;
        height: var(--topbar-h);
        flex-direction: row;
        align-items: center;
        padding: 0 var(--s-lg);
        border-right: none;
        border-bottom: 1px solid var(--sidebar-border);
        overflow: visible;
        position: sticky;
        top: 0;
        z-index: 250;
    }

    .sidebar-header {
        flex: 1;
        margin-bottom: 0;
    }

    .hamburger { display: flex; }

    .nav {
        position: absolute;
        top: var(--topbar-h);
        left: 0;
        right: 0;
        flex-direction: column;
        background: var(--sidebar-bg);
        border-bottom: 1px solid var(--sidebar-border);
        box-shadow: var(--shadow-md);
        gap: var(--s-xs);
        z-index: 249;

        max-height: 0;
        overflow: hidden;
        opacity: 0;
        padding: 0 var(--s-lg);
        transition:
            max-height 0.32s ease,
            opacity    0.25s ease,
            padding    0.32s ease;
    }

    .is-open .nav {
        max-height: 320px;
        opacity: 1;
        padding: var(--s-sm) var(--s-lg);
    }

    .sidebar-footer { display: none; }
}
</style>
