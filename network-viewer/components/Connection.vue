<template>
  <div class="overflow-hidden h-screen">
    <div class="border-2 border-gray-200 flex flex-col h-full overflow-hidden">
      <div
        class="flex-shrink-0 px-2 py-3 sm:px-6 bg-gray-700 border-b-2 border-gray-200"
      >
        <h3 class="text-lg leading-6 font-medium text-gray-100">
          Network viewer
          <small>({{ connected ? 'Connected' : 'Connecting...' }})</small>
        </h3>
        <div class="mt-1 max-w-6xl text-sm text-gray-300">
          <button @click="clearConnections" class="py-2 px-4 rounded">
            Clear
          </button>
          <label for="l-filter-local">Filterout local:</label>
          <input id="l-filter-local" type="checkbox" v-model="filterLocal" />
          (total requests: {{ numRequests }}, total time: {{ totalTime }})
          <label for="host" class="px-1">Host:</label>
          <select
            id="host"
            v-model="selectedHost"
            :class="{ 'text-red-600': selectedHost }"
          >
            <option value="">No selected host</option>
            <option v-for="host in hosts" :value="host.value" :key="host.value">
              {{ host.text }}
            </option>
          </select>
          <label for="search-phrase" class="px-1">Search:</label>
          <input
            type="text"
            id="search-phrase"
            :class="{ 'text-red-600': searchPhrase }"
            v-model="searchPhrase"
            placeholder="Search..."
          />
        </div>
      </div>
      <div class="flex-1 flex overflow-x-hidden flex-wrap overflow-hidden">
        <div class="w-full h-full overflow-auto lg:w-1/2 xl:w-1/2">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-700 border-r-2 border-gray-300">
              <tr class="border-b-2 border-gray-300">
                <th
                  scope="col"
                  class="px-2 py-2 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                >
                  path
                </th>
                <th
                  scope="col"
                  class="w-5 px-2 py-2 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                >
                  method
                </th>
                <th
                  scope="col"
                  class="w-5 px-2 py-2 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                >
                  status
                </th>
                <th
                  scope="col"
                  class="px-2 py-2 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                >
                  host
                </th>
                <th
                  scope="col"
                  class="w-5 px-2 py-2 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                >
                  time
                </th>
                <th
                  scope="col"
                  class="w-5 px-2 py-2 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                >
                  proto
                </th>
              </tr>
            </thead>
            <tbody
              class="bg-gray-700 divide-y divide-gray-200 border-t-2 border-gray-200"
            >
              <tr
                v-for="connection in connections"
                :key="connection.connectionID"
                @click="selectConnection(connection)"
                class="cursor-pointer"
                :class="connection === selectedConnection ? 'bg-gray-500' : ''"
              >
                <td class="px-2 py-2 text-xs text-gray-100 truncate">
                  <span class="w-64 block truncate" :title="connection.path">{{
                    connection.path
                  }}</span>
                </td>
                <td class="px-2 py-2 text-xs text-gray-100">
                  {{ connection.method }}
                </td>
                <td class="px-2 py-2 text-xs text-gray-100">
                  {{
                    (connection.response && connection.response.statusCode) ||
                    '...'
                  }}
                </td>
                <td class="px-2 py-2 text-xs text-gray-100 truncate">
                  <span class="w-48 block truncate" :title="connection.host">{{
                    connection.host
                  }}</span>
                </td>
                <!-- <td class="px-2 py-2 text-xs text-gray-100">{{ connection.response ? 'yes' : 'no' }}</td> -->
                <td class="px-2 py-2 text-xs text-gray-100">
                  {{
                    (connection.response && connection.response.reqTime) ||
                    '...'
                  }}
                </td>
                <td class="px-2 py-2 text-xs text-gray-100">
                  {{
                    (connection.response && connection.response.httpVersion) ||
                    '...'
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          class="w-full flex flex-col h-full overflow-hidden lg:w-1/2 xl:w-1/2"
        >
          <div
            :class="[
              'bg-gray-700 border-b-2 border-gray-200 px-2 py-2',
              'text-left text-xs font-medium text-gray-100 uppercase tracking-wider',
            ]"
          >
            selected connection
          </div>
          <div
            v-if="selectedConnection"
            class="bg-gray-700 text-gray-50 px-2 py-2 max-h-full overflow-auto text-sm font-mono"
          >
            <div>
              <p>
                url:
                <strong>{{
                  selectedConnection.host + selectedConnection.path
                }}</strong>
              </p>
            </div>
            <div>
              <p>
                statusCode:
                <strong>{{
                  selectedConnection.response &&
                  selectedConnection.response.statusCode
                }}</strong>
              </p>
              <p>
                reqTime:
                <strong>{{
                  selectedConnection.response &&
                  selectedConnection.response.reqTime
                }}</strong>
              </p>
            </div>
            <div v-if="selectedConnection.body" class="py-3">
              <hr />
              request body:
              <pre>{{ selectedConnection.body }}</pre>
            </div>
            <div v-if="selectedConnection.headers" class="py-3">
              <hr />
              request headers:
              <pre>{{ selectedConnection.headers }}</pre>
            </div>
            <div
              v-if="
                selectedConnection.response && selectedConnection.response.body
              "
              class="py-3"
            >
              <hr />
              response body:
              <pre>{{ selectedConnection.response.body }}</pre>
            </div>
            <div
              v-if="
                selectedConnection.response &&
                selectedConnection.response.headers
              "
              class="py-3"
            >
              <hr />
              response headers:
              <pre>{{ selectedConnection.response.headers }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, defineComponent } from 'vue';

function setCookie(cookieName, cookieValue, expireInDays = 365) {
  const d = new Date();
  d.setTime(d.getTime() + expireInDays * 24 * 60 * 60 * 1000);
  const expires = expireInDays === 0 ? '' : `expires=${d.toUTCString()}`;
  document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
}

function getCookie(cookieName) {
  const name = `${cookieName}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function isLocal(connection) {
  return ['127.0.0.1', 'localhost'].some(host =>
    connection.host.includes(host)
  );
}

export default defineComponent({
  setup() {
    const connections = ref({});
    const connected = ref(false);
    const selectedConnection = ref(null);
    const filterLocal = ref(getCookie('filterLocalHost') === 'true');

    async function connect() {
      const WSocket = WebSocket || (await import('ws'));
      const ws = new WSocket('ws://localhost:12346');

      ws.onopen = () => {
        connected.value = true;
      };

      ws.onclose = () => {
        connected.value = false;
        setTimeout(() => {
          connect();
        }, 3000);
      };

      ws.onmessage = ({ data }) => {
        const payload = JSON.parse(data);

        if (payload && payload.isRequest) {
          connections.value = {
            ...connections.value,
            [payload.connectionID]: payload,
          };
        } else if (payload && connections.value[payload.connectionID]) {
          const request = connections.value[payload.connectionID];
          request.response = payload;
          payload.reqTime = payload.time - request.time;
          connections.value = { ...connections.value };
        }
      };
    }

    connect();

    watch([filterLocal], ([local]) => {
      setCookie('filterLocalHost', String(local));
    });

    function getHostLabel(host) {
      const hostDescriptionMapping = {
        'localhost:3001': 'GraphQL',
        'salesforce.com': 'Commerce API',
        'demandware.com': 'SFCC Auth',
        'demandware.net': 'OCAPI',
        'sanity.io': 'Sanity CMS',
        'api.cquotient.com': 'Einstein Recommendations',
        'widget-api.stylitics.com': 'Stylitics Recommendations',
        'distillery.pixlee.co': 'Pixlee images from instagram',
      };

      const key = Object.keys(hostDescriptionMapping).find(hostPart =>
        host.includes(hostPart)
      );

      return key ? `( ${hostDescriptionMapping[key]} )` : '';
    }

    const hosts = computed(() =>
      Object.keys(connections.value)
        .map(k => connections.value[k].host)
        .filter((value, index, self) => self.indexOf(value) === index)
        .map(host => {
          return {
            value: host,
            text: [host, getHostLabel(host)].join(' '),
          };
        })
    );

    const selectedHost = ref('');
    const searchPhrase = ref('');

    const filteredConnections = computed(() =>
      Object.keys(connections.value)
        .map(k => connections.value[k])
        .filter(conn => (filterLocal.value ? !isLocal(conn) : true))
        .filter(conn => !selectedHost.value || selectedHost.value === conn.host)
        .filter(
          conn =>
            !searchPhrase.value ||
            (conn.host + conn.path).includes(searchPhrase.value)
        )
    );

    return {
      selectedHost,
      searchPhrase,
      hosts,
      connections: filteredConnections,
      numRequests: computed(() => filteredConnections.value.length),
      totalTime: computed(() =>
        filteredConnections.value.reduce(
          (acc, curr) => acc + (curr.response?.reqTime || 0),
          0
        )
      ),
      filterLocal,
      connected,
      selectedConnection,
      isLocal,
      selectConnection(connection) {
        selectedConnection.value = connection;
      },
      clearConnections() {
        connections.value = {};
        selectedHost.value = '';
        searchPhrase.value = '';
      },
    };
  },
});
</script>