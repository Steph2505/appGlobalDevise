<script setup>
import { ref, computed, watch } from 'vue'
import AppInput from '@/components/globales/AppInput.vue'
import AppSelect from '@/components/globales/AppSelect.vue'
import AppButton from '@/components/globales/AppButton.vue'
import AppModal from '@/components/globales/AppModal.vue'
import CustomerCreate from '@/components/customer/Create.vue'
import { useCustomerStore } from '@/stores/customerStore'

const props = defineProps({
  devis:   { type: Object,  default: null },
  clients: { type: Array,   default: () => [] },
  errors:  { type: Object,  default: () => ({}) },
  loading: { type: Boolean, default: false },
})

const emit = defineEmits(['submit', 'cancel'])

// select statut : 0 = Drafts, 1 = Validated
const statusOptions = [
  { value: 0, label: 'Draft' },
  { value: 1, label: 'Validated' },
]

// Options de devise
const currencyOptions = [
  { value: 'XAF', label: 'XAF (FCFA)' },
  { value: 'USD', label: 'Dollar ($)' },
  { value: 'EUR', label: 'Euro (€)' },
]

// Formatage des clients pour le select
const clientOptions = computed(() =>
  props.clients.map(c => ({ value: c.id, label: c.name }))
)

function nouvelleLigne() {
  return { intitule: '', quantite: 1, prix_unitaire: 0 }
}

const form = ref({
  client_id: '',
  statusIndex: 0,
  currency: 'XAF',
  lignes: [nouvelleLigne()],
})

// Calcule le total de chaque ligne (quantité x prix unitaire)
function totalLigne(ligne) {
  const qte = Math.max(0, Number(ligne.quantite) || 0)
  const pu  = Math.max(0, Number(ligne.prix_unitaire) || 0)
  return qte * pu
}

// Somme de tous les totaux de lignes, recalculée en temps réel
const montantTotal = computed(() =>
  form.value.lignes.reduce((sum, l) => sum + totalLigne(l), 0)
)

function ajouterLigne() {
  form.value.lignes.push(nouvelleLigne())
}

// Protège la contrainte : au moins 1 ligne doit rester
function supprimerLigne(index) {
  if (form.value.lignes.length > 1) {
    form.value.lignes.splice(index, 1)
  }
}

//Si c'est la modification d'un devis, on pré-remplit le formulaire
watch(
  () => props.devis,
  (val) => {
    
    if (val) {
      console.log("val",val);
      form.value = {
        client_id:   val.client_id,
        statusIndex: val.status === 'Validated' ? 1 : 0,
        currency:  val.currency || 'XAF',
        lignes: val.lignes?.length
          ? val.lignes.map(l => ({
              intitule:      l.intitule,
              quantite:      l.quantite,
              prix_unitaire: l.prix_unitaire,
            }))
          : [nouvelleLigne()],
      }
    } else {
      form.value = { client_id: '', statusIndex: 0,currency: 'XAF', lignes: [nouvelleLigne()] }
    }
  },
  { immediate: true },
)

function handleSubmit() {
  emit('submit', {
    client_id:     form.value.client_id,
    status:        form.value.statusIndex === 1 ? 'Validated' : 'Drafts',
    currency:      form.value.currency,
    lignes:        form.value.lignes.map(l => ({ ...l, total: totalLigne(l) })),
    montant_total: montantTotal.value,
  })
}

// Modal création client
const customerStore = useCustomerStore()
const showClientModal = ref(false)

async function handleCreateClient(formData) {
  try {
    const result = await customerStore.create(formData)
    form.value.client_id = result.data.id
    showClientModal.value = false
  } catch {
    // errors disponibles dans customerStore.errors
  }
}
</script>

<template>
  <div class="body-form">
    <div class="content-form">
      <div class="form">

        <div class="form-row">
          <div class="client-select-wrapper">
            <AppSelect
              v-model="form.client_id"
              label="Customer"
              :options="clientOptions"
              placeholder="Select a customer"
              :error="errors.client_id?.[0]"
              required
            />
            <button type="button" class="add-client-btn" title="New customer" @click="showClientModal = true"> <i class="fas fa-plus"></i> </button>
          </div>
          <AppSelect
            :modelValue="form.statusIndex"
            label="Status"
            :options="statusOptions"
            :error="errors.status?.[0]"
            required
            @update:modelValue="form.statusIndex = $event"
          />
        </div> 
        <div class="form-row">
          <AppSelect
            v-model="form.currency"
            label="Currency"
            :options="currencyOptions"
            required
          />
        </div>

        <!-- Tableau des lignes d'articles -->
        <div class="lignes-section">
          <p class="lignes-title">Line items</p>

          <!-- En-têtes de colonnes (masqués sur mobile) -->
          <div class="ligne-header">
            <span>Description</span>
            <span>Quantity</span>
            <span>Unit price</span>
            <span>Total</span>
            <span></span>
          </div>

          
          <div
            v-for="(ligne, index) in form.lignes"
            :key="index"
            class="ligne"
          >
            <div class="ligne-field">
              <span class="ligne-label-mobile">Description</span>
              <AppInput
                v-model="ligne.intitule"
                placeholder="Item description"
                :error="errors[`lignes.${index}.intitule`]?.[0]"
              />
            </div>

            <div class="ligne-field">
              <span class="ligne-label-mobile">Quantity</span>
              <AppInput
                v-model="ligne.quantite"
                type="number"
                placeholder="1"
                :error="errors[`lignes.${index}.quantite`]?.[0]"
              />
            </div>

            <div class="ligne-field">
              <span class="ligne-label-mobile">Unit price</span>
              <AppInput
                v-model="ligne.prix_unitaire"
                type="number"
                placeholder="0.00"
                :error="errors[`lignes.${index}.prix_unitaire`]?.[0]"
              />
            </div>

            <div class="ligne-field">
              <span class="ligne-label-mobile">Total</span>
              <div class="ligne-total">
                {{ totalLigne(ligne).toLocaleString('fr-FR', { minimumFractionDigits: 2 }) }} {{ form.currency }}
              </div>
            </div>

            <div class="ligne-field">
              <AppButton
                variant="danger"
                :disabled="form.lignes.length === 1"
                @click="supprimerLigne(index)"
              >
                Remove
              </AppButton>
            </div>
          </div>
        </div>

        <!-- Ajouter une ligne -->
        <div>
          <AppButton variant="primary" @click="ajouterLigne">
            Add line
          </AppButton>
        </div>

        <!-- Montant total calculé en temps réel -->
        <div class="montant-total">
          <span class="montant-label">Total amount</span>
          <span class="montant-value">
            {{ montantTotal.toLocaleString('fr-FR', { minimumFractionDigits: 2 }) }} {{ form.currency }}
          </span>
        </div>

        <p v-if="errors.general" class="error-general">{{ errors.general }}</p>

        <div class="form-footer">
          <AppButton variant="secondary" @click="emit('cancel')">Cancel</AppButton>
          <AppButton variant="primary" :loading="loading" type="submit" @click="handleSubmit">
            {{ devis ? 'Edit' : 'Save' }}
          </AppButton>
        </div>

      </div>
    </div>
  </div>

  <AppModal title="New customer" :show="showClientModal" @close="showClientModal = false">
    <CustomerCreate
      :errors="customerStore.errors"
      :loading="customerStore.loading"
      @submit="handleCreateClient"
      @cancel="showClientModal = false"
    />
  </AppModal>
</template>

<style scoped>
.body-form {
  display: flex;
  justify-content: center;
}

.content-form {
  width: 100%;
  max-width: 900px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: var(--s-lg);
  width: 100%;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--s-md);
}

.client-select-wrapper {
  display: flex;
  align-items: flex-end;
  gap: var(--s-xs);
}

.client-select-wrapper > :first-child {
  flex: 1;
}

.add-client-btn {
  flex-shrink: 0;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--r-md);
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
  margin-bottom: 1px;
}

.add-client-btn:hover {
  opacity: 0.85;
}

.lignes-section {
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  overflow: hidden;
}

.lignes-title {
  margin: 0;
  padding: var(--s-sm) var(--s-lg);
  font-size: var(--f-md);
  font-weight: var(--f-bold);
  color: var(--text-2);
  background: var(--bg-soft);
  border-bottom: 1px solid var(--border);
}


.ligne-header,.ligne {
  display: grid;
  grid-template-columns: minmax(0, 2fr) 0.6fr 1fr 1fr auto;
  gap: var(--s-sm);
  align-items: start;
  padding: var(--s-sm) var(--s-lg);
}

.ligne-header {
  background: var(--bg-soft);
  border-bottom: 1px solid var(--border);
  font-size: var(--f-sm);
  font-weight: var(--f-medium);
  color: var(--text-3);
  align-items: center;
}

.ligne {
  padding: var(--s-md) var(--s-lg);
  border-bottom: 1px solid var(--border);
}

.ligne:last-child {
  border-bottom: none;
}


.ligne-label-mobile {
  display: none;
  font-size: var(--f-sm);
  font-weight: var(--f-medium);
  color: var(--text-3);
  margin-bottom: var(--s-xs);
}


.ligne-total {
  height: 38px;
  display: flex;
  align-items: center;
  padding: 0 var(--s-md);
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  font-size: var(--f-base);
  font-weight: var(--f-medium);
  color: var(--text);
}

.montant-total {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--s-md);
  padding: var(--s-md) var(--s-lg);
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
}

.montant-label {
  font-size: var(--f-md);
  font-weight: var(--f-bold);
  color: var(--text-2);
}

.montant-value {
  font-size: var(--f-lg);
  font-weight: var(--f-bold);
  color: var(--primary);
}

.error-general {
  font-size: var(--f-md);
  color: var(--danger);
}

.form-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--s-sm);
  padding-top: var(--s-sm);
}


@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .ligne-header {
    display: none;
  }

  .ligne {
    grid-template-columns: 1fr;
    padding: var(--s-md);
  }

  .ligne-field {
    display: flex;
    flex-direction: column;
  }

  .ligne-label-mobile {
    display: block;
  }

  .form-footer {
    flex-direction: column;
  }
}
</style>
