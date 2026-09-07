export const canonical={
      mode:'replay',model:'claude-sonnet-4-6',source:'docs/EVIDENCE_G1_G2.md',
      concurrencyProof:{allStartedBeforeFirstCompleted:true,explanation:'Verified live receipts: all 3 initial loops started before any completed · 8.432s three-way overlap.'},
      proposals:[
        {agentRole:'schedule',version:1,sceneId:'S22',start:'16:30',location:'Stage B',resources:['lead_actor','camera_a','van_1'],action:'Protect scene throughput under the disruption.'},
        {agentRole:'talent',version:1,sceneId:'S14',start:'16:30',location:'Stage A',resources:['lead_actor','camera_a'],action:'Move lead work into the actor availability window.'},
        {agentRole:'logistics',version:1,sceneId:'S18',start:'16:30',location:'Warehouse',resources:['support_cast','camera_b','van_1'],action:'Move weather-safe work while keeping transport feasible.'},
        {agentRole:'schedule',version:2,sceneId:'S22',start:'18:00',location:'Stage B',resources:['lead_actor','camera_a','van_1'],action:'Targeted repair against the updated shared state.'}
      ],
      conflicts:[
        {leftRole:'talent',rightRole:'schedule',resource:'lead_actor'},
        {leftRole:'talent',rightRole:'schedule',resource:'camera_a'},
        {leftRole:'logistics',rightRole:'schedule',resource:'van_1'}
      ],
      timeline:[
        {at:'2026-09-05T17:54:46.830Z',kind:'inference.started',label:'Schedule Agent initial loop started'},
        {at:'2026-09-05T17:54:46.852Z',kind:'inference.started',label:'Talent Agent initial loop started'},
        {at:'2026-09-05T17:54:46.853Z',kind:'inference.started',label:'Logistics Agent initial loop started'},
        {at:'2026-09-05T17:54:55.285Z',kind:'inference.completed',label:'Talent Agent completed first — all three had already started'},
        {at:'2026-09-05T17:54:55.461Z',kind:'inference.completed',label:'Logistics Agent completed'},
        {at:'2026-09-05T17:54:56.056Z',kind:'inference.completed',label:'Schedule Agent completed initial proposal'},
        {at:'2026-09-05T17:54:56.057Z',kind:'conflict.detected',label:'Constraint Guard: lead_actor collision'},
        {at:'2026-09-05T17:54:56.057Z',kind:'conflict.detected',label:'Constraint Guard: camera_a collision'},
        {at:'2026-09-05T17:54:56.057Z',kind:'conflict.detected',label:'Constraint Guard: van_1 collision'},
        {at:'2026-09-05T17:54:56.058Z',kind:'repair.requested',label:'Targeted repair requested from Schedule Agent'},
        {at:'2026-09-05T17:54:56.058Z',kind:'inference.started',label:'Schedule Agent v2 repair loop started'},
        {at:'2026-09-05T17:55:00.317Z',kind:'inference.completed',label:'Schedule Agent v2 returned S22 @ 18:00'},
        {at:'2026-09-05T17:55:00.318Z',kind:'commit.complete',label:'Constraint Guard: final plan conflict-free'}
      ],
      finalPlan:[
        {agentRole:'talent',version:1,sceneId:'S14',start:'16:30',location:'Stage A',resources:['lead_actor','camera_a'],action:'Lead work begins after the delay window.'},
        {agentRole:'logistics',version:1,sceneId:'S18',start:'16:30',location:'Warehouse',resources:['support_cast','camera_b','van_1'],action:'Weather-safe work uses the scarce van through 18:00.'},
        {agentRole:'schedule',version:2,sceneId:'S22',start:'18:00',location:'Stage B',resources:['lead_actor','camera_a','van_1'],action:'Repair starts exactly when the competing 16:30–18:00 claims release.'}
      ]
    };

