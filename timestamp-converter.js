(function() {
    var WORLD_ZONES = [
        { city: 'New York',       tz: 'America/New_York',      flag: 'US' },
        { city: 'Los Angeles',    tz: 'America/Los_Angeles',   flag: 'US' },
        { city: 'Chicago',        tz: 'America/Chicago',       flag: 'US' },
        { city: 'São Paulo',      tz: 'America/Sao_Paulo',     flag: 'BR' },
        { city: 'London',         tz: 'Europe/London',         flag: 'GB' },
        { city: 'Paris',          tz: 'Europe/Paris',          flag: 'FR' },
        { city: 'Berlin',         tz: 'Europe/Berlin',         flag: 'DE' },
        { city: 'Istanbul',       tz: 'Europe/Istanbul',       flag: 'TR' },
        { city: 'Moscow',         tz: 'Europe/Moscow',         flag: 'RU' },
        { city: 'Dubai',          tz: 'Asia/Dubai',            flag: 'AE' },
        { city: 'Mumbai',         tz: 'Asia/Kolkata',          flag: 'IN' },
        { city: 'Dhaka',          tz: 'Asia/Dhaka',            flag: 'BD' },
        { city: 'Bangkok',        tz: 'Asia/Bangkok',          flag: 'TH' },
        { city: 'Singapore',      tz: 'Asia/Singapore',        flag: 'SG' },
        { city: 'Shanghai',       tz: 'Asia/Shanghai',         flag: 'CN' },
        { city: 'Tokyo',          tz: 'Asia/Tokyo',            flag: 'JP' },
        { city: 'Seoul',          tz: 'Asia/Seoul',            flag: 'KR' },
        { city: 'Sydney',         tz: 'Australia/Sydney',      flag: 'AU' },
        { city: 'Auckland',       tz: 'Pacific/Auckland',      flag: 'NZ' },
        { city: 'Cairo',          tz: 'Africa/Cairo',          flag: 'EG' },
        { city: 'Johannesburg',   tz: 'Africa/Johannesburg',   flag: 'ZA' },
        { city: 'UTC',            tz: 'UTC',                   flag: ''   }
    ];

    var ALL_ZONES = [
        { label: 'UTC',                        tz: 'UTC' },
        { label: 'New York (ET)',               tz: 'America/New_York' },
        { label: 'Chicago (CT)',                tz: 'America/Chicago' },
        { label: 'Denver (MT)',                 tz: 'America/Denver' },
        { label: 'Los Angeles (PT)',            tz: 'America/Los_Angeles' },
        { label: 'Toronto',                     tz: 'America/Toronto' },
        { label: 'São Paulo (BRT)',             tz: 'America/Sao_Paulo' },
        { label: 'Buenos Aires',                tz: 'America/Argentina/Buenos_Aires' },
        { label: 'Mexico City',                 tz: 'America/Mexico_City' },
        { label: 'London (GMT/BST)',            tz: 'Europe/London' },
        { label: 'Paris (CET)',                 tz: 'Europe/Paris' },
        { label: 'Berlin (CET)',                tz: 'Europe/Berlin' },
        { label: 'Madrid',                      tz: 'Europe/Madrid' },
        { label: 'Rome',                        tz: 'Europe/Rome' },
        { label: 'Amsterdam',                   tz: 'Europe/Amsterdam' },
        { label: 'Stockholm',                   tz: 'Europe/Stockholm' },
        { label: 'Warsaw',                      tz: 'Europe/Warsaw' },
        { label: 'Istanbul (TRT)',              tz: 'Europe/Istanbul' },
        { label: 'Moscow (MSK)',                tz: 'Europe/Moscow' },
        { label: 'Cairo (EET)',                 tz: 'Africa/Cairo' },
        { label: 'Nairobi (EAT)',               tz: 'Africa/Nairobi' },
        { label: 'Johannesburg (SAST)',         tz: 'Africa/Johannesburg' },
        { label: 'Lagos',                       tz: 'Africa/Lagos' },
        { label: 'Riyadh',                      tz: 'Asia/Riyadh' },
        { label: 'Dubai (GST)',                 tz: 'Asia/Dubai' },
        { label: 'Karachi',                     tz: 'Asia/Karachi' },
        { label: 'Mumbai/Delhi (IST)',          tz: 'Asia/Kolkata' },
        { label: 'Dhaka (BST)',                 tz: 'Asia/Dhaka' },
        { label: 'Bangkok (ICT)',               tz: 'Asia/Bangkok' },
        { label: 'Singapore (SGT)',             tz: 'Asia/Singapore' },
        { label: 'Kuala Lumpur',                tz: 'Asia/Kuala_Lumpur' },
        { label: 'Jakarta',                     tz: 'Asia/Jakarta' },
        { label: 'Hong Kong',                   tz: 'Asia/Hong_Kong' },
        { label: 'Shanghai/Beijing (CST)',      tz: 'Asia/Shanghai' },
        { label: 'Taipei',                      tz: 'Asia/Taipei' },
        { label: 'Tokyo (JST)',                 tz: 'Asia/Tokyo' },
        { label: 'Seoul (KST)',                 tz: 'Asia/Seoul' },
        { label: 'Sydney (AEST)',               tz: 'Australia/Sydney' },
        { label: 'Melbourne',                   tz: 'Australia/Melbourne' },
        { label: 'Auckland (NZST)',             tz: 'Pacific/Auckland' },
        { label: 'Honolulu',                    tz: 'Pacific/Honolulu' }
    ];

    function pad2(n) { return n < 10 ? '0' + n : '' + n; }

    function fmtUTC(d) {
        return d.getUTCFullYear() + '-' +
            pad2(d.getUTCMonth() + 1) + '-' +
            pad2(d.getUTCDate()) + ' ' +
            pad2(d.getUTCHours()) + ':' +
            pad2(d.getUTCMinutes()) + ':' +
            pad2(d.getUTCSeconds()) + ' UTC';
    }

    function fmtISO(d) {
        return d.toISOString().replace('T', ' ').replace(/\.\d+Z/, ' UTC');
    }

    function formatInTz(ts, tz) {
        try {
            var d = new Date(ts);
            return d.toLocaleString('en-GB', {
                timeZone: tz,
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                hour12: false
            });
        } catch (e) { return 'N/A'; }
    }

    function formatTimeOnly(ts, tz) {
        try {
            var d = new Date(ts);
            return d.toLocaleString('en-GB', {
                timeZone: tz,
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                hour12: false
            });
        } catch (e) { return '--:--:--'; }
    }

    function formatDateOnly(ts, tz) {
        try {
            var d = new Date(ts);
            return d.toLocaleString('en-GB', {
                timeZone: tz,
                weekday: 'short', month: 'short', day: 'numeric'
            });
        } catch (e) { return ''; }
    }

    function getOffsetStr(tz) {
        try {
            var d = new Date();
            var utcMs = d.getTime();
            var localStr = d.toLocaleString('en-US', { timeZone: tz, hour12: false,
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit' });
            var tzDate = new Date(localStr.replace(/(\d+)\/(\d+)\/(\d+),/, '$3-$1-$2'));
            var diff = Math.round((tzDate - new Date(d.toLocaleString('en-US', { timeZone: 'UTC', hour12: false,
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(/(\d+)\/(\d+)\/(\d+),/, '$3-$1-$2'))) / 60000);
            var sign = diff >= 0 ? '+' : '-';
            var abs = Math.abs(diff);
            return 'UTC' + sign + Math.floor(abs / 60) + (abs % 60 ? ':' + pad2(abs % 60) : '');
        } catch(e) { return ''; }
    }

    // Build world clock cards
    var clocksEl = document.getElementById('tsWorldClocks');
    var clockEls = [];
    if (clocksEl) {
        WORLD_ZONES.forEach(function(z, i) {
            var card = document.createElement('div');
            card.className = 'wc-card';
            var timeEl = document.createElement('div');
            timeEl.className = 'wc-time';
            timeEl.id = 'wc-time-' + i;
            var dateEl = document.createElement('div');
            dateEl.className = 'wc-date';
            dateEl.id = 'wc-date-' + i;
            var cityEl = document.createElement('div');
            cityEl.className = 'wc-city';
            cityEl.textContent = z.city;
            var offEl = document.createElement('div');
            offEl.className = 'wc-offset';
            offEl.id = 'wc-offset-' + i;
            card.appendChild(timeEl);
            card.appendChild(dateEl);
            card.appendChild(cityEl);
            card.appendChild(offEl);
            clocksEl.appendChild(card);
            clockEls.push({ timeEl: timeEl, dateEl: dateEl, offEl: offEl, tz: z.tz });
        });
        // set offsets once (they rarely change)
        clockEls.forEach(function(c) {
            c.offEl.textContent = getOffsetStr(c.tz);
        });
    }

    function updateLive() {
        var now = Date.now();
        var unixSec = Math.floor(now / 1000);
        var liveUnix = document.getElementById('tsLiveUnix');
        var liveMs = document.getElementById('tsLiveMs');
        var liveUTC = document.getElementById('tsLiveUTC');
        if (liveUnix) liveUnix.textContent = unixSec.toLocaleString();
        if (liveMs) liveMs.textContent = now.toLocaleString();
        if (liveUTC) liveUTC.textContent = fmtUTC(new Date(now));

        clockEls.forEach(function(c) {
            c.timeEl.textContent = formatTimeOnly(now, c.tz);
            c.dateEl.textContent = formatDateOnly(now, c.tz);
        });
    }

    setInterval(updateLive, 1000);
    updateLive();

    function makeResultRow(label, val) {
        var row = document.createElement('div');
        row.className = 'timestamp-result-row';
        var lbl = document.createElement('span');
        lbl.className = 'timestamp-result-row-label';
        lbl.textContent = label;
        var v = document.createElement('span');
        v.className = 'timestamp-result-row-val';
        v.textContent = val;
        row.appendChild(lbl);
        row.appendChild(v);
        return row;
    }

    var convertUnixBtn = document.getElementById('tsConvertUnix');
    if (convertUnixBtn) {
        convertUnixBtn.addEventListener('click', function() {
            var raw = document.getElementById('tsInputUnix').value.trim();
            var tz = document.getElementById('tsInputTz').value;
            var resultBlock = document.getElementById('tsUnixResult');
            resultBlock.innerHTML = '';
            if (!raw) return;
            var num = parseInt(raw, 10);
            if (isNaN(num)) { resultBlock.textContent = 'Invalid timestamp'; return; }
            var ts = raw.length >= 13 ? num : num * 1000;
            var d = new Date(ts);
            resultBlock.appendChild(makeResultRow('Unix (seconds)', Math.floor(ts / 1000).toLocaleString()));
            resultBlock.appendChild(makeResultRow('Unix (ms)', ts.toLocaleString()));
            resultBlock.appendChild(makeResultRow('UTC', fmtISO(d)));
            resultBlock.appendChild(makeResultRow(tz, formatInTz(ts, tz)));
            resultBlock.appendChild(makeResultRow('ISO 8601', d.toISOString()));
        });
    }

    var convertDateBtn = document.getElementById('tsConvertDate');
    if (convertDateBtn) {
        convertDateBtn.addEventListener('click', function() {
            var raw = document.getElementById('tsInputDate').value;
            var resultBlock = document.getElementById('tsDateResult');
            resultBlock.innerHTML = '';
            if (!raw) return;
            var d = new Date(raw);
            if (isNaN(d.getTime())) { resultBlock.textContent = 'Invalid date'; return; }
            var ts = d.getTime();
            resultBlock.appendChild(makeResultRow('Unix (seconds)', Math.floor(ts / 1000).toLocaleString()));
            resultBlock.appendChild(makeResultRow('Unix (ms)', ts.toLocaleString()));
            resultBlock.appendChild(makeResultRow('UTC', fmtISO(d)));
            resultBlock.appendChild(makeResultRow('ISO 8601', d.toISOString()));
        });
    }

    var zoneConvertBtn = document.getElementById('tsZoneConvert');
    if (zoneConvertBtn) {
        zoneConvertBtn.addEventListener('click', function() {
            var raw = document.getElementById('tsZoneInput').value;
            var grid = document.getElementById('tsZonesGrid');
            grid.innerHTML = '';
            if (!raw) return;
            var d = new Date(raw);
            if (isNaN(d.getTime())) { grid.textContent = 'Invalid date'; grid.style.display = 'block'; return; }
            var ts = d.getTime();
            ALL_ZONES.forEach(function(z) {
                var card = document.createElement('div');
                card.className = 'tz-card';
                var label = document.createElement('div');
                label.className = 'tz-card-label';
                label.textContent = z.label;
                var val = document.createElement('div');
                val.className = 'tz-card-val';
                val.textContent = formatInTz(ts, z.tz);
                var off = document.createElement('div');
                off.className = 'tz-card-offset';
                off.textContent = getOffsetStr(z.tz);
                card.appendChild(label);
                card.appendChild(val);
                card.appendChild(off);
                grid.appendChild(card);
            });
            grid.style.display = 'grid';
        });
    }
})();
