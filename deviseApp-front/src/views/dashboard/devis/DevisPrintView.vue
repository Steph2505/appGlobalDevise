<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDevis } from '@/composable/useDevis'

const route  = useRoute()
const router = useRouter()
const { selectedDevis, loading, fetchOne } = useDevis()

const id = Number(route.params.id)

// Informations de l'entreprise depuis le .env
const company = {
  name:     import.meta.env.VITE_COMPANY_NAME     ?? '',
  address:  import.meta.env.VITE_COMPANY_ADDRESS  ?? '',
  phone:    import.meta.env.VITE_COMPANY_PHONE    ?? '',
  email:    import.meta.env.VITE_COMPANY_EMAIL    ?? '',
  website:  import.meta.env.VITE_COMPANY_WEBSITE  ?? '',
  siret:    import.meta.env.VITE_COMPANY_SIRET    ?? '',
  taxId:    import.meta.env.VITE_COMPANY_TAX_ID   ?? '',
  currency: import.meta.env.VITE_COMPANY_CURRENCY ?? 'FCFA',
  logo:     import.meta.env.VITE_COMPANY_LOGO     ?? '',
  footer:   import.meta.env.VITE_COMPANY_FOOTER   ?? '',
}

function formatRef(ref) {
  return ref ?? '—'
}

function formatDate(str) {
  return str ? new Date(str).toLocaleDateString('fr-FR') : '—'
}

function formatMontant(val) {
  return Number(val ?? 0).toLocaleString('fr-FR', { minimumFractionDigits: 2 })
}

function print() {
  window.print()
}

onMounted(() => fetchOne(id))
</script>

<template>
  <div class="controls no-print">
    <button class="btn-back" @click="router.back()"> Back</button>
    <button class="btn-print" @click="print()">Print</button>
  </div>

  <div v-if="loading" class="loading">Loading quote...</div>

  <div v-else-if="selectedDevis" class="document">

    <header class="doc-header">
      <div class="company">
        <img v-if="company.logo" :src="company.logo" alt="Logo" class="logo" />
        <h1 class="company-name">{{ company.name }}</h1>
        <p v-if="company.address">{{ company.address }}</p>
        <p v-if="company.phone">Tel: {{ company.phone }}</p>
        <p v-if="company.email">Email : {{ company.email }}</p>
        <p v-if="company.website">{{ company.website }}</p>
      </div>


      <div class="devis-info">
        <h2 class="devis-title">DEVIS</h2>
        <table class="info-table">
          <tbody>
            <tr>
              <td class="info-label">Reference:</td>
              <td class="info-value">{{ formatRef(selectedDevis.reference) }}</td>
            </tr>
            <tr>
              <td class="info-label">Date:</td>
              <td class="info-value">{{ formatDate(selectedDevis.created_at) }}</td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </header>

    <hr class="separator" />

    <section class="client-section">
      <p class="section-label">Quote to:</p>
      <p class="client-name">{{ selectedDevis.client?.name ?? '—' }}</p>
      <p v-if="selectedDevis.client?.email">{{ selectedDevis.client.email }}</p>
      <p v-if="selectedDevis.client?.phone">{{ selectedDevis.client.phone }}</p>
      <p v-if="selectedDevis.client?.address">{{ selectedDevis.client.address }}</p>
    </section>

    <table class="lines-table">
      <thead>
        <tr>
          <th class="col-num">N</th>
          <th class="col-desc">Description</th>
          <th class="col-qty">Qty</th>
          <th class="col-price">Unit price</th>
          <th class="col-total">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ligne, index) in selectedDevis.lignes ?? []" :key="index">
          <td class="col-num center">{{ index + 1 }}</td>
          <td class="col-desc">{{ ligne.intitule }}</td>
          <td class="col-qty center">{{ ligne.quantite }}</td>
          <td class="col-price right">{{ formatMontant(ligne.prix_unitaire) }} {{ selectedDevis.currency ?? 'XAF' }}</td>
          <td class="col-total right bold">{{ formatMontant(ligne.total) }} {{ selectedDevis.currency ?? 'XAF' }}</td>
        </tr>

        
        <tr v-if="!selectedDevis.lignes?.length">
          <td colspan="5" class="empty-row">No lines</td>
        </tr>
      </tbody>
    </table>

    
    <div class="total-section">
      <div class="total-box">
        <span class="total-label">Total amount</span>
        <span class="total-value">{{ formatMontant(selectedDevis.montant_total) }} {{ selectedDevis.currency ?? 'XAF' }}</span>
      </div>
    </div>

<!--     
    <div class="signature-section">
      <div class="signature-box">
        <p class="signature-label">Signature et cachet du client</p>
        <div class="signature-area"></div>
      </div>
    </div> -->

    
    <footer class="doc-footer">
      <p class="footer-legal">
        {{ company.name }}
        <span v-if="company.siret"> — RCCM : {{ company.siret }}</span>
        <span v-if="company.taxId"> — N° Contrib. : {{ company.taxId }}</span>
      </p>
      <p v-if="company.footer" class="footer-conditions">{{ company.footer }}</p>
    </footer>

  </div>
</template>

<style scoped>
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background: var(--bg-white);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 10;
}

.btn-back {
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg-white);
  cursor: pointer;
  font-size: 14px;
  color: var(--text);
}

.btn-print {
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  background: var(--primary);
  color: var(--bg-white);
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
}

.btn-print:hover { opacity: 0.9; }
.btn-back:hover  { background: var(--bg-white); }

.loading {
  padding: 40px;
  text-align: center;
  color: #888;
}

.document {
  width: 210mm;
  min-height: 297mm;
  margin: 24px auto;
  padding: 20mm 18mm 28mm;
  background: var(--bg-white);
  box-shadow: 0 2px 16px rgba(0,0,0,0.12);
  font-family: Arial, sans-serif;
  font-size: 10pt;
  color: var(--text);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}


.doc-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.company .logo {
  max-height: 50px;
  max-width: 120px;
  margin-bottom: 6px;
  display: block;
}

.company-name {
  font-size: 16pt;
  font-weight: bold;
  color: var(--primary);
  margin: 0 0 4px 0;
}

.company p {
  margin: 2px 0;
  color: var(--text);
  font-size: 9pt;
}

.devis-info { text-align: right; }

.devis-title {
  font-size: 22pt;
  font-weight: bold;
  color: var(--primary);
  margin: 0 0 10px 0;
}

.info-table { border-collapse: collapse; margin-left: auto; }

.info-label {
  color: var(--text-3);
  padding: 2px 12px 2px 0;
  font-size: 9pt;
  text-align: right;
}

.info-value {
  font-weight: 600;
  color: var(--text);
  text-align: right;
  font-size: 9pt;
}

.badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 99px;
  font-size: 8pt;
  font-weight: bold;
}

.badge-valid { background: var(--badge-valid-bg); color: var(--badge-valid-text); }
.badge-draft { background: var(--badge-draft-bg); color: var(--badge-draft-text); }

.separator {
  border: none;
  border-top: 1.5px solid #ddd;
  margin: 16px 0;
}

/* CLIENT */
.client-section {
  background: var(--bg-light);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 12px 16px;
  margin-bottom: 20px;
  display: inline-block;
  min-width: 220px;
}

.section-label {
  font-size: 8pt;
  font-weight: bold;
  color: var(--primary);
  text-transform: uppercase;
  margin: 0 0 4px 0;
}

.client-name {
  font-size: 12pt;
  font-weight: bold;
  color: var(--text);
  margin: 0 0 2px 0;
}

.client-section p {
  margin: 2px 0;
  color: var(--text);
  font-size: 9pt;
}

/* TABLEAU DES LIGNES */
.lines-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 0;
  font-size: 9.5pt;
}

.lines-table thead tr {
  background: var(--primary);
  color: var(--bg-white);
}

.lines-table th {
  padding: 8px 10px;
  text-align: left;
  font-weight: 600;
}

.lines-table td {
  padding: 7px 10px;
  border-bottom: 1px solid var(--border);
}

.lines-table tbody tr:nth-child(even) { background: var(--bg-light); }
.lines-table tbody tr:last-child td   { border-bottom: 2px solid var(--border); }

.col-num   { width: 30px; }
.col-qty   { width: 50px; }
.col-price { width: 120px; }
.col-total { width: 120px; }

.center { text-align: center; }
.right  { text-align: right; }
.bold   { font-weight: 600; }

.empty-row {
  text-align: center;
  padding: 20px;
  color: #aaa;
  font-style: italic;
}

/* TOTAL */
.total-section {
  display: flex;
  justify-content: flex-end;
  margin: 16px 0 24px;
}

.total-box {
  background: var(--primary);
  color: var(--bg-white);
  padding: 10px 20px;
  border-radius: 6px;
  display: flex;
  gap: 24px;
  align-items: center;
}

.total-label { font-size: 10pt; font-weight: 600; }
.total-value { font-size: 13pt; font-weight: bold; }

/* SIGNATURE */
.signature-section {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 32px;
}

.signature-box {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
  padding: 8px 12px;
}

.signature-label {
  font-size: 8pt;
  color: #888;
  margin: 0 0 28px 0;
  text-align: center;
}

.signature-area {
  border-top: 1px solid #bbb;
  height: 8px;
}

/* PIED DE PAGE — margin-top: auto le pousse toujours en bas (flexbox) */
.doc-footer {
  margin-top: auto;
  border-top: 1px solid #ddd;
  padding-top: 10px;
  text-align: center;
}

.footer-legal {
  font-size: 8pt;
  color: var(--text-3);
  margin: 0 0 4px 0;
}

.footer-conditions {
  font-size: 8pt;
  color: var(--text-3);
  font-style: italic;
  margin: 0;
}

@page {
  size: A4;
  margin: 0;
}

@media print {
  html, body {
    margin: 0;
    padding: 0;
  }

  .no-print { display: none !important; }

  .document {
    width: 100%;
    min-height: unset;
    margin: 0;
    padding: 15mm 14mm 18mm;
    box-shadow: none;
  }

  .doc-footer {
    position: static;
    margin-top: auto;
    padding-top: 10px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .lines-table thead tr,
  .total-box,
  .badge {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
