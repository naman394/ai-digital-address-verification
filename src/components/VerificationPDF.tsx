import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { VerificationData } from '@/types';

// Use built-in Helvetica for reliability
const S = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    fontSize: 8,
    color: '#1e293b',
  },

  // ── Header ──────────────────────────────────────────────────────────
  header: {
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
  },
  headerId: {
    color: '#93c5fd',
    fontSize: 7,
    fontFamily: 'Courier',
  },

  // ── Info grid ───────────────────────────────────────────────────────
  infoGrid: {
    flexDirection: 'row',
    borderBottom: '1pt solid #e2e8f0',
  },
  infoCol: {
    flex: 1,
  },
  infoColLeft: {
    flex: 1,
    borderRight: '1pt solid #e2e8f0',
  },
  row: {
    flexDirection: 'row',
    borderBottom: '1pt solid #e2e8f0',
    minHeight: 20,
  },
  rowLabel: {
    width: '38%',
    backgroundColor: '#1e3a8a',
    color: '#ffffff',
    paddingHorizontal: 6,
    paddingVertical: 4,
    fontFamily: 'Helvetica-Bold',
    fontSize: 7,
    justifyContent: 'center',
  },
  rowValue: {
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 4,
    color: '#334155',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  rowValuePass: {
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 4,
    color: '#16a34a',
    fontFamily: 'Helvetica-Bold',
    justifyContent: 'center',
  },
  rowValueFail: {
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 4,
    color: '#dc2626',
    fontFamily: 'Helvetica-Bold',
    justifyContent: 'center',
  },

  // ── Section band ────────────────────────────────────────────────────
  sectionBand: {
    backgroundColor: '#3730a3',
    color: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
  },

  // ── Map table ───────────────────────────────────────────────────────
  mapTable: {
    borderBottom: '1pt solid #e2e8f0',
  },
  mapTableHead: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderBottom: '1pt solid #e2e8f0',
  },
  mapTh: {
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 4,
    fontFamily: 'Helvetica-Bold',
    fontSize: 7,
    color: '#475569',
    borderRight: '1pt solid #e2e8f0',
  },
  mapTd: {
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 4,
    color: '#334155',
    borderRight: '1pt solid #e2e8f0',
    flexWrap: 'wrap',
  },
  mapTableRow: {
    flexDirection: 'row',
    borderBottom: '1pt solid #e2e8f0',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 'auto',
  },

  // ── GPS summary  ─────────────────────────────────────────────────────
  gpsSummary: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderBottom: '1pt solid #e2e8f0',
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 20,
  },
  gpsCol: {
    flex: 1,
  },
  gpsLabel: {
    fontSize: 7,
    color: '#64748b',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2,
  },
  gpsValue: {
    fontSize: 8,
    color: '#1e293b',
    fontFamily: 'Courier',
  },

  // ── Evidence photos ─────────────────────────────────────────────────
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottom: '1pt solid #e2e8f0',
  },
  photoCell: {
    width: '50%',
    borderRight: '1pt solid #e2e8f0',
    borderBottom: '1pt solid #e2e8f0',
  },
  photoCellLabel: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontFamily: 'Helvetica-Bold',
    fontSize: 7,
    color: '#475569',
    borderBottom: '1pt solid #e2e8f0',
    textTransform: 'uppercase',
  },
  photoImg: {
    width: '100%',
    height: 130,
    objectFit: 'cover',
  },
  photoNoImg: {
    width: '100%',
    height: 130,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoNoImgText: {
    color: '#94a3b8',
    fontSize: 8,
  },
  photoMeta: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f8fafc',
    borderTop: '1pt solid #e2e8f0',
    flexDirection: 'row',
    gap: 12,
  },
  photoMetaItem: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
  },
  photoMetaLabel: {
    fontSize: 6,
    color: '#64748b',
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
  },
  photoMetaValue: {
    fontSize: 6,
    color: '#334155',
    fontFamily: 'Courier',
  },

  // ── Footer ───────────────────────────────────────────────────────────
  footer: {
    position: 'absolute',
    bottom: 16,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: '1pt solid #e2e8f0',
    paddingTop: 6,
  },
  footerText: {
    fontSize: 6,
    color: '#94a3b8',
  },
});

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function InfoRow({ label, value, isStatus }: { label: string; value: string; isStatus?: boolean }) {
  const valueStyle =
    isStatus && value === 'pass' ? S.rowValuePass :
      isStatus && value === 'fail' ? S.rowValueFail : S.rowValue;
  return (
    <View style={S.row}>
      <View style={S.rowLabel}><Text>{label}</Text></View>
      <View style={valueStyle}><Text>{value || '-'}</Text></View>
    </View>
  );
}

function PhotoCell({ label, image, timestamp, location }: {
  label: string; image?: string; timestamp?: string; location?: string;
}) {
  return (
    <View style={S.photoCell}>
      <Text style={S.photoCellLabel}>{label}</Text>
      {image ? (
        <Image style={S.photoImg} src={image} />
      ) : (
        <View style={S.photoNoImg}>
          <Text style={S.photoNoImgText}>No image provided</Text>
        </View>
      )}
      <View style={S.photoMeta}>
        {timestamp && (
          <View style={S.photoMetaItem}>
            <Text style={S.photoMetaLabel}>Time:</Text>
            <Text style={S.photoMetaValue}>{timestamp}</Text>
          </View>
        )}
        {location && (
          <View style={S.photoMetaItem}>
            <Text style={S.photoMetaLabel}>GPS:</Text>
            <Text style={S.photoMetaValue}>{location}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

export function VerificationPDF({ data }: { data: VerificationData }) {
  const distance = data.claimed_lat && data.captured_lat
    ? calculateDistance(data.claimed_lat, data.claimed_lng!, data.captured_lat, data.captured_lng!)
    : 0;

  return (
    <Document title={`Verification-${data.ref_id || data.id}`}>
      <Page size="A4" style={S.page}>
        {/* Header */}
        <View style={S.header}>
          <Text style={S.headerTitle}>Employee Residential Address Verification Form</Text>
          <Text style={S.headerId}>ID: {data.id}</Text>
        </View>

        {/* Info grid */}
        <View style={S.infoGrid}>
          <View style={S.infoColLeft}>
            <InfoRow label="Instruction ID" value={data.instruction_id || '-'} />
            <InfoRow label="Name" value={data.name || '-'} />
            <InfoRow label="Address" value={data.address || '-'} />
            <InfoRow label="Type of Address" value={data.type_of_address || '-'} />
            <InfoRow label="Mobile Number" value={data.mobile_number || '-'} />
            <InfoRow label="Period of Stay" value={data.period_of_stay || '-'} />
          </View>
          <View style={S.infoCol}>
            <InfoRow label="Ref ID" value={data.ref_id || '-'} />
            <InfoRow label="Verification Date" value={data.verification_date || '-'} />
            <InfoRow label="Ownership Status" value={data.ownership_status || 'Own'} />
            <InfoRow label="Comment" value={data.comment || 'Verified via GPS and Photo Evidence'} />
            <InfoRow label="Verification Status" value={data.verification_status || '-'} isStatus />
          </View>
        </View>

        {/* Map section header */}
        <Text style={S.sectionBand}>Address shown on the map (Radius: 200 m)</Text>

        {/* Map coordinates table */}
        <View style={S.mapTable}>
          <View style={S.mapTableHead}>
            <Text style={S.mapTh}>Description</Text>
            <Text style={S.mapTh}>Source</Text>
            <Text style={S.mapTh}>Distance</Text>
            <Text style={S.mapTh}>Resolution Logic</Text>
            <Text style={[S.mapTh, { borderRight: 0 }]}>Legend</Text>
          </View>
          <View style={S.mapTableRow}>
            <Text style={S.mapTd}>{data.address}</Text>
            <Text style={S.mapTd}>Input Address</Text>
            <Text style={S.mapTd}>0 km</Text>
            <Text style={S.mapTd}>Google Location API</Text>
            <View style={[S.mapTd, { borderRight: 0 }]}>
              <View style={[S.dot, { backgroundColor: '#ef4444' }]} />
            </View>
          </View>
          <View style={[S.mapTableRow, { borderBottom: 0 }]}>
            <Text style={S.mapTd}>{data.captured_lat?.toFixed(7)}, {data.captured_lng?.toFixed(7)}</Text>
            <Text style={S.mapTd}>GPS</Text>
            <Text style={S.mapTd}>{distance.toFixed(2)} km</Text>
            <Text style={S.mapTd}>Device GPS Capture</Text>
            <View style={[S.mapTd, { borderRight: 0 }]}>
              <View style={[S.dot, { backgroundColor: '#22c55e' }]} />
            </View>
          </View>
        </View>

        {/* GPS coordinate summary */}
        <View style={S.gpsSummary}>
          <View style={S.gpsCol}>
            <Text style={S.gpsLabel}>🔴 Claimed Location (Geocoded)</Text>
            <Text style={S.gpsValue}>{data.claimed_lat?.toFixed(7)}, {data.claimed_lng?.toFixed(7)}</Text>
          </View>
          <View style={S.gpsCol}>
            <Text style={S.gpsLabel}>🟢 GPS Captured Point</Text>
            <Text style={S.gpsValue}>{data.captured_lat?.toFixed(7)}, {data.captured_lng?.toFixed(7)}</Text>
          </View>
          <View style={S.gpsCol}>
            <Text style={S.gpsLabel}>📍 Distance</Text>
            <Text style={S.gpsValue}>{distance.toFixed(3)} km</Text>
          </View>
        </View>

        {/* Photographic Evidence */}
        <Text style={S.sectionBand}>Photographic Evidence</Text>
        <View style={S.photoGrid}>
          <PhotoCell
            label="Selfie"
            image={data.selfie}
            timestamp={data.selfie_meta?.timestamp}
            location={data.selfie_meta?.location}
          />
          <PhotoCell
            label="Location Picture (Door / Full House)"
            image={data.location_picture}
            timestamp={data.location_picture_meta?.timestamp}
            location={data.location_picture_meta?.location}
          />
          <PhotoCell
            label="ID Proof (Relative Verifying)"
            image={data.id_proof_relative || data.id_proof_candidate}
            timestamp={data.id_proof_relative_meta?.timestamp}
            location={data.id_proof_relative_meta?.location}
          />
          <PhotoCell
            label="ID Proof (The Candidate)"
            image={data.id_proof_candidate}
            timestamp={data.id_proof_candidate_meta?.timestamp}
            location={data.id_proof_candidate_meta?.location}
          />
          <PhotoCell
            label="Landmark Picture"
            image={data.landmark_picture}
            timestamp={data.landmark_picture_meta?.timestamp}
            location={data.landmark_picture_meta?.location}
          />
        </View>

        {/* Footer */}
        <View style={S.footer} fixed>
          <Text style={S.footerText}>VeriAddress — Confidential Address Verification Report</Text>
          <Text style={S.footerText}>Generated: {new Date().toLocaleString('en-IN')} | Ref: {data.ref_id}</Text>
        </View>
      </Page>
    </Document>
  );
}
