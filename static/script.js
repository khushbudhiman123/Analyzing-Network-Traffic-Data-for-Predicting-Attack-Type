document.getElementById('predictionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(document.getElementById('predictionForm'));
    const data = Object.fromEntries(formData);
    
    // Protocol to numeric mapping
    const protocolMap = {
        'TCP': 0,
        'UDP': 1,
        'ICMP': 2,
        'Other': 3
    };
    
    // Convert protocol string to number
    if (data['protocol']) {
        data['protocol'] = protocolMap[data['protocol']] !== undefined ? protocolMap[data['protocol']] : 3;
    }
    
    // Convert numeric strings to numbers
    const numericFields = [
        'protocol', 'flow_duration', 'total_fwd_packets', 'fwd_packets_length_total',
        'bwd_packets_length_total', 'fwd_packet_length_max', 'fwd_packet_length_mean',
        'bwd_packet_length_max', 'bwd_packet_length_min', 'flow_bytes/s', 'flow_packets/s',
        'flow_iat_mean', 'flow_iat_std', 'flow_iat_min', 'fwd_iat_min', 'bwd_iat_total',
        'bwd_iat_mean', 'bwd_iat_std', 'bwd_iat_max', 'bwd_iat_min', 'bwd_packets/s',
        'fin_flag_count', 'down/up_ratio', 'init_fwd_win_bytes', 'init_bwd_win_bytes',
        'fwd_act_data_packets', 'fwd_seg_size_min', 'active_mean', 'active_max', 'active_min'
    ];
    
    numericFields.forEach(field => {
        if (data[field]) {
            data[field] = parseFloat(data[field]);
        }
    });
    
    // Show loading state
    showLoading();
    
    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok && !result.error) {
            showResult(result);
        } else {
            showError(result.error || 'An error occurred during prediction');
        }
    } catch (error) {
        showError('Network error: ' + error.message);
    }
});

function showLoading() {
    document.getElementById('predictionForm').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'none';
    document.getElementById('errorContainer').style.display = 'none';
    
    const loader = document.createElement('div');
    loader.id = 'loadingIndicator';
    loader.innerHTML = '<div class="loader"></div><p style="text-align: center; color: #667eea; margin-top: 10px;">Processing prediction...</p>';
    document.querySelector('.content').appendChild(loader);
}

function showResult(result) {
    const loader = document.getElementById('loadingIndicator');
    if (loader) loader.remove();
    
    document.getElementById('predictionForm').style.display = 'none';
    document.getElementById('errorContainer').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'block';
    
    let resultHTML = `
        <div class="prediction">
            <strong>Attack Type Predicted:</strong>
        </div>
        <div class="attack-type">
            ${result.attack_type || 'Unknown'}
        </div>
    `;
    
    if (result.confidence) {
        resultHTML += `
            <div style="margin-top: 15px; padding: 15px; background: #f9f9f9; border-radius: 8px;">
                <strong>Confidence:</strong> ${(result.confidence * 100).toFixed(2)}%
            </div>
        `;
    }
    
    if (result.probability) {
        resultHTML += `
            <div style="margin-top: 10px; padding: 15px; background: #f9f9f9; border-radius: 8px;">
                <strong>Additional Details:</strong><br>
                <pre>${JSON.stringify(result.probability, null, 2)}</pre>
            </div>
        `;
    }
    
    document.getElementById('resultContent').innerHTML = resultHTML;
}

function showError(errorMessage) {
    const loader = document.getElementById('loadingIndicator');
    if (loader) loader.remove();
    
    document.getElementById('predictionForm').style.display = 'none';
    document.getElementById('resultContainer').style.display = 'none';
    document.getElementById('errorContainer').style.display = 'block';
    document.getElementById('errorMessage').textContent = errorMessage;
}

function resetForm() {
    document.getElementById('predictionForm').reset();
    document.getElementById('predictionForm').style.display = 'grid';
    document.getElementById('resultContainer').style.display = 'none';
    document.getElementById('errorContainer').style.display = 'none';
    window.scrollTo(0, 0);
}

// Autofill functions with sample data
function loadSampleNormal() {
    const normalData = {
        'protocol': 'TCP',
        'flow_duration': 450,
        'total_fwd_packets': 12,
        'fwd_packets_length_total': 2048,
        'bwd_packets_length_total': 3096,
        'fwd_packet_length_max': 512,
        'fwd_packet_length_mean': 170.67,
        'bwd_packet_length_max': 1024,
        'bwd_packet_length_min': 64,
        'flow_bytes/s': 11.29,
        'flow_packets/s': 0.053,
        'flow_iat_mean': 40.71,
        'flow_iat_std': 35.14,
        'flow_iat_min': 1.0,
        'fwd_iat_min': 2.0,
        'bwd_iat_total': 198.0,
        'bwd_iat_mean': 28.29,
        'bwd_iat_std': 22.85,
        'bwd_iat_max': 89.0,
        'bwd_iat_min': 1.0,
        'bwd_packets/s': 0.015,
        'fin_flag_count': 1.0,
        'down/up_ratio': 0.65,
        'init_fwd_win_bytes': 2920,
        'init_bwd_win_bytes': 1024,
        'fwd_act_data_packets': 8,
        'fwd_seg_size_min': 32,
        'active_mean': 125.5,
        'active_max': 450,
        'active_min': 10
    };
    fillForm(normalData);
}

function loadSampleDoS() {
    const dosData = {
        'protocol': 'TCP',
        'flow_duration': 15000,
        'total_fwd_packets': 850,
        'fwd_packets_length_total': 45000,
        'bwd_packets_length_total': 12000,
        'fwd_packet_length_max': 1500,
        'fwd_packet_length_mean': 52.94,
        'bwd_packet_length_max': 512,
        'bwd_packet_length_min': 32,
        'flow_bytes/s': 3.8,
        'flow_packets/s': 0.057,
        'flow_iat_mean': 17.65,
        'flow_iat_std': 12.34,
        'flow_iat_min': 0.5,
        'fwd_iat_min': 1.0,
        'bwd_iat_total': 4500.0,
        'bwd_iat_mean': 56.25,
        'bwd_iat_std': 45.67,
        'bwd_iat_max': 234.0,
        'bwd_iat_min': 0.5,
        'bwd_packets/s': 0.008,
        'fin_flag_count': 89.0,
        'down/up_ratio': 0.26,
        'init_fwd_win_bytes': 4096,
        'init_bwd_win_bytes': 512,
        'fwd_act_data_packets': 650,
        'fwd_seg_size_min': 16,
        'active_mean': 850.5,
        'active_max': 15000,
        'active_min': 100
    };
    fillForm(dosData);
}

function loadSampleDDoS() {
    const ddosData = {
        'protocol': 'UDP',
        'flow_duration': 45000,
        'total_fwd_packets': 5000,
        'fwd_packets_length_total': 125000,
        'bwd_packets_length_total': 8000,
        'fwd_packet_length_max': 1472,
        'fwd_packet_length_mean': 25.0,
        'bwd_packet_length_max': 256,
        'bwd_packet_length_min': 20,
        'flow_bytes/s': 2.94,
        'flow_packets/s': 0.111,
        'flow_iat_mean': 9.0,
        'flow_iat_std': 3.45,
        'flow_iat_min': 0.1,
        'fwd_iat_min': 0.2,
        'bwd_iat_total': 8000.0,
        'bwd_iat_mean': 32.0,
        'bwd_iat_std': 18.5,
        'bwd_iat_max': 156.0,
        'bwd_iat_min': 0.5,
        'bwd_packets/s': 0.018,
        'fin_flag_count': 0.0,
        'down/up_ratio': 0.16,
        'init_fwd_win_bytes': 65535,
        'init_bwd_win_bytes': 256,
        'fwd_act_data_packets': 4500,
        'fwd_seg_size_min': 8,
        'active_mean': 2500.0,
        'active_max': 45000,
        'active_min': 500
    };
    fillForm(ddosData);
}

function clearForm() {
    document.getElementById('predictionForm').reset();
    document.getElementById('resultContainer').style.display = 'none';
    document.getElementById('errorContainer').style.display = 'none';
}

function fillForm(data) {
    const form = document.getElementById('predictionForm');
    for (const [key, value] of Object.entries(data)) {
        const field = form.elements[key];
        if (field) {
            field.value = value;
        }
    }
    // Hide result/error containers
    document.getElementById('resultContainer').style.display = 'none';
    document.getElementById('errorContainer').style.display = 'none';
    window.scrollTo(0, 0);
}
