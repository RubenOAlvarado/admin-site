import { ClientWithRelations } from "../../types/Clients"
import { motion } from 'framer-motion';

export function ClientSelector({
  clients,
  onSelect,
  selected
}: {
  clients: ClientWithRelations[],
  onSelect: (client: ClientWithRelations) => void,
  selected: ClientWithRelations | null
}) {
  return (
    <motion.select
        id="client-select"
        value={selected?.id || ''}
        onChange={(e) => {
        const client = clients.find(c => c.id === e.target.value);
        if (client) onSelect(client);
      }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    >
        <option value="">Select a client...</option>
        {clients.map((client) => (
            <option key={client.id} value={client.id}>
                {client.name}
            </option>
        ))}
    </motion.select>
  );
}