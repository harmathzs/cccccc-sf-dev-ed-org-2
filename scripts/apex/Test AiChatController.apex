// Test AiChatController

HttpCalloutController.OutputParams result = AiChatController.calloutToGroq('{\n' +
        '"model": "deepseek-r1-distill-llama-70b",\n' +
        '"messages": [{\n' +
        '    "role": "user",\n' +
        '    "content": "Explain the importance of fast language models"\n' +
        '}]\n' +
        '}');

System.debug('result: ');
System.debug(result);
