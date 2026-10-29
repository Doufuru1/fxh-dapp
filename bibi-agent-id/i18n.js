(() => {
  const pairs = [
    ['Mint', '铸造'], ['Mechanics', '机制'], ['Tiers', '分级'], ['Whitepaper', '白皮书'], ['FAQ', '常见问题'],
    ['Connect wallet', '连接钱包'], ['BIBI · AGENT ID ACTIVATED', 'BIBI · AGENT ID 已激活'],
    ['Your Agent ID.', '你的 Agent ID。'], ['Your BIBI.', '你的 BIBI。'],
    ['A playful mint pass built for Binance Agent ID holders. Connect your Binance Agentic Wallet, claim your shares, and help BIBI find its way to the open market.', '为 Binance Agent ID 持有者打造的趣味铸造通行证。连接 Binance Agentic Wallet，领取你的份额，陪伴 BIBI 走向公开市场。'],
    ['Start minting ↗', '开始铸造 ↗'], ['How it works', '如何运作'],
    ['● BNB Smart Chain · Contract-ready demo interface', '● BNB Smart Chain · 合约演示界面'],
    ['Agent ID powered mint', '基于 Agent ID 的铸造'], ['BNB CHAIN', 'BNB 智能链'], ['Current mint progress', '当前铸造进度'],
    ['Public pool opens at 10,000 shares', '达到 10,000 份后开放公开池'], ['BASE TIER', '基础档'], ['Mint shares', '铸造份数'], ['SHARES', '份'],
    ['Base mint price', '基础铸造价格'], ['/ SHARE', '/ 份'], ['Demo only · no wallet transaction is sent from this page.', '仅为演示 · 本页面不会发起真实钱包交易。'],
    ['BIBI per first share pack', '每个首份礼包的 BIBI 数量'], ['shares per verified Agent ID', '每个已验证 Agent ID 的份额'],
    ['mint flow added to liquidity', '铸造金额的流动性占比'], ['sent to the multi-signature wallet', '进入多签钱包'], ['Binance Agent ID access layer', 'Binance Agent ID 访问层'],
    ['THE BIBI LOOP', 'BIBI 运作机制'], ['Small ID.', '小小的 ID。'], ['Big personality.', '大大的个性。'],
    ['BIBI keeps the experience simple: verify the identity you already own, mint from a 0.002 BNB base, and watch the community unlock the public pool together.', 'BIBI 保持流程简单：验证你已有的身份，从 0.002 BNB 基础价格开始铸造，与社区一起解锁公开流动性池。'],
    ['01 / VERIFY', '01 / 验证'], ['Agent ID first', 'Agent ID 优先'], ['Connect the Binance Agentic Wallet that holds your Agent ID. Eligibility is checked before minting.', '连接持有 Agent ID 的 Binance Agentic Wallet，铸造前会先校验资格。'],
    ['02 / COLLECT', '02 / 领取'], ['Base price, clear tiers', '基础价格，分级清晰'], ['The base mint price is 0.002 BNB per share. Later tiers are written into the launch contract, not copied from another project.', '基础铸造价格为 0.002 BNB / 份，后续档位写入 BIBI 合约，不照搬其他项目。'],
    ['03 / UNLOCK', '03 / 解锁'], ['85% goes to LP', '85% 进入流动性池'], ['85% of each mint is reserved for the liquidity pool; the remaining 15% goes to the project multi-signature wallet.', '每笔铸造的 85% 用于流动性池，剩余 15% 进入项目多签钱包。'],
    ['BIBI AGENT ID TIERS', 'BIBI AGENT ID 分级'], ['分级公开，', 'Tiers are public,'], ['规则不藏在角落。', 'nothing is hidden.'], ['分级公开，规则不藏在角落。', 'Tiers are public. Nothing is hidden.'],
    ['BIBI 与参考项目的区别：不是照搬 1U 起步的定价，而是从 0.002 BNB 基础铸造价开始，后续档位由你们的合约参数决定。', 'BIBI starts at a 0.002 BNB base price; later tiers are defined by the BIBI contract, not copied from the reference project.'],
    ['Mint tiers / BIBI 分级', 'Mint tiers / BIBI tiers'], ['Base tier is live · later tiers can be configured in the launch contract', '基础档已开放 · 后续档位可由合约配置'],
    ['● BASE TIER LIVE', '● 基础档开放'], ['Current tier', '当前档位'], ['基础档 · 当前', 'Base tier · current'], ['Agent ID 档', 'Agent ID tier'], ['社区贡献档', 'Community contribution tier'], ['公开池档', 'Public pool tier'], ['最终开放档', 'Final open tier'],
    ['合约配置', 'Contract configured'], ['LOCKED', '待配置'], ['CURRENT', '当前'], ['基础价格：0.002 BNB / share。其余档位数量、触发条件和价格以最终合约为准。', 'Base price: 0.002 BNB / share. Thresholds and prices for later tiers follow the final contract.'],
    ['ALLOCATION', '资金分配'], ['Built for a', '为清晰启动而'], ['clean launch.', '设计。'], ['Every number below is presented as a mechanism preview. Confirm the deployed contract and official announcements before participating.', '以下数字是机制预览，参与前请确认正式合约和官方公告。'],
    ['Where each mint goes', '每笔铸造的去向'], ['PancakeSwap liquidity', 'PancakeSwap 流动性'], ['Multi-signature wallet', '多签钱包'], ['Network', '网络'], ['Quick answers', '常见问题'], ['Who can mint?', '谁可以铸造？'], ['Verified Agent ID', '已验证的 Agent ID'], ['What is the base?', '基础价格是多少？'], ['Can I connect later?', '可以稍后连接吗？'], ['Yes', '可以'], ['Is this financial advice?', '这是投资建议吗？'], ['No', '不是'],
    ['FROM ID TO MARKET', '从 ID 到市场'], ['Three steps.', '三个步骤。'], ['One happy BIBI.', '一个开心的 BIBI。'], ['A calm, legible flow for a community launch: verify first, participate second, open the market last.', '清晰的社区启动流程：先验证，再参与，最后开放市场。'],
    ['Bring your Agent ID', '带上你的 Agent ID'], ['Open the Binance Agentic Wallet and connect the verified address.', '打开 Binance Agentic Wallet，连接已验证的地址。'], ['Choose your shares', '选择你的份额'], ['Review the current tier, then mint the amount you want within your limit.', '确认当前档位，在额度内铸造你需要的份额。'], ['Invite your agents', '邀请你的 Agent'], ['Community activity helps the share count move toward the public pool.', '社区活动帮助份额进度走向公开池。'], ['Meet BIBI on-chain', '在链上遇见 BIBI'], ['Once the target is reached, liquidity can move to the open market.', '达到目标后，流动性可以进入公开市场。'],
    ['Connect your Agent ID', '连接你的 Agent ID'], ['This is a front-end demo. Select a wallet to preview the verified Agent ID state; no transaction will be submitted.', '这是前端演示。选择钱包即可预览 Agent ID 验证状态，不会提交真实交易。'], ['Binance Agentic Wallet', 'Binance Agentic Wallet'], ['Recommended ↗', '推荐 ↗'], ['Connect', '连接'], ['WalletConnect', 'WalletConnect'], ['Demo wallet disconnected', '演示钱包已断开'], ['Agent ID 已验证，BIBI 铸造权限已解锁 ✓', 'Agent ID verified. BIBI mint access unlocked ✓'],
    ['Rules in the', '规则写在'], ['open.', '明面上。'], ['This page contains the BIBI-specific launch logic: a 0.002 BNB base mint, 85% liquidity allocation, and 15% multi-signature treasury allocation.', '这里写的是 BIBI 自己的启动规则：0.002 BNB 基础铸造价、85% 流动性分配和 15% 多签资金分配。'], ['DOCUMENT STATUS', '文档状态'], ['Product preview · contract parameters to be verified on-chain', '产品预览 · 合约参数以链上验证为准'], ['01 / 项目定位', '01 / PROJECT POSITIONING'], ['Agent ID 是访问层，BIBI 是资产层。', 'Agent ID is the access layer; BIBI is the asset layer.'], ['BIBI 是一个基于 Binance Agent ID 的社区铸造项目。持有并验证 Agent ID 的地址进入铸造流程，BIBI 头像与品牌负责建立社区识别度，资金去向与市场规则由最终智能合约公开约束。', 'BIBI is a community mint built around Binance Agent ID. Verified Agent ID addresses enter the mint flow, while the BIBI avatar and brand create community identity. Fund flows and market rules are governed by the final smart contract.'], ['参与前请以正式部署的合约、区块浏览器和官方公告为最终依据。', 'Verify the deployed contract, block explorer, and official announcements before participating.'], ['02 / 核心参数', '02 / CORE PARAMETERS'], ['基础铸造价格', 'Base mint price'], ['流动性注入', 'Liquidity allocation'], ['多签钱包', 'Multi-signature wallet'], ['目标网络', 'Target network'], ['访问方式', 'Access'], ['03 / 资金流向', '03 / FUND FLOW'], ['每笔铸造支付通过合约进行拆分。85% 进入流动性池，用于后续市场深度；15% 发送至项目多签钱包，由多签成员共同管理。前端页面不持有私人密钥，也不替代区块浏览器中的链上验证。', 'Each mint payment is split by the contract: 85% goes to liquidity for market depth, while 15% goes to the project multi-signature wallet. The front end never holds private keys and does not replace on-chain verification.'], ['PAYMENT', '支付'], ['Mint payment', '铸造支付'], ['用户按当前铸造档位支付 BNB。', 'The user pays BNB at the current mint tier.'], ['LIQUIDITY', '流动性'], ['85% → LP', '85% → LP'], ['大部分资金为流动性池预留。', 'Most funds are reserved for the liquidity pool.'], ['MULTISIG', '多签'], ['15% → Treasury', '15% → Treasury'], ['剩余部分进入多签钱包。', 'The remainder goes to the multi-signature wallet.'], ['04 / BIBI 分级算法', '04 / BIBI TIER ALGORITHM'], ['BIBI 共生成 353 级，基础换算为 1U = 0.002 BNB。第 1 级覆盖 0–10,000 份；第 2–11 级每级增加 1,000 份，价格从 1.1U 递增至 2U；第 12–181 级每级增加 1,000 份，价格按 0.02U 递增；第 182–353 级每级增加 20,000 份，价格按 0.015U 递增，最高 8.07U = 0.01614 BNB。', 'BIBI generates 353 tiers. The base conversion is 1U = 0.002 BNB. Tier 1 covers 0–10,000 shares; tiers 2–11 add 1,000 shares each and rise from 1.1U to 2U; tiers 12–181 add 1,000 shares each at +0.02U; tiers 182–353 add 20,000 shares each at +0.015U, reaching 8.07U = 0.01614 BNB.'], ['TIER 01 / LIVE', 'TIER 01 / 当前开放'], ['基础铸造档 · 当前开放', 'Base mint tier · live'], ['TIER 02—11', 'TIER 02—11'], ['每级 +1,000 份 · 1.1—2U', '+1,000 shares each · 1.1—2U'], ['TIER 12—181', 'TIER 12—181'], ['每级 +1,000 份 · 2.1—5.48U', '+1,000 shares each · 2.1—5.48U'], ['TIER 182—353', 'TIER 182—353'], ['每级 +20,000 份 · 5.5—8.07U', '+20,000 shares each · 5.5—8.07U'], ['05 / 透明度', '05 / TRANSPARENCY'], ['多签地址、分级表、铸造上限和流动性操作应在正式部署后公开。页面当前为产品演示，不承诺价格、收益或上线结果。', 'The multisig address, tier table, mint cap, and liquidity actions should be published after deployment. This page is a product demo and promises no price, return, or launch outcome.'], ['06 / 风险提示', '06 / RISK NOTICE'], ['参与前请自行核验合约地址、网络、权限、税费、流动性锁定状态和多签成员。不要仅凭页面信息做出资产决策。', 'Verify the contract, network, permissions, taxes, liquidity lock status, and multisig members yourself. Do not make asset decisions based only on this page.']
  ].map(([first, second]) => {
    const firstIsChinese = /[\u4e00-\u9fff]/.test(first);
    const secondIsChinese = /[\u4e00-\u9fff]/.test(second);
    return firstIsChinese && !secondIsChinese ? { en: second, zh: first } : { en: first, zh: second };
  });

  window.initBibiLanguage = function initBibiLanguage({ onChange } = {}) {
    let lang = localStorage.getItem('bibi-lang') || 'zh';
    const nodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!node.parentElement || ['SCRIPT', 'STYLE'].includes(node.parentElement.tagName)) continue;
      nodes.push({ node, base: node.nodeValue });
    }
    const lookup = (text, target) => {
      const pair = pairs.find((item) => item.en === text || item.zh === text);
      return pair ? pair[target] : text;
    };
    const apply = (next) => {
      lang = next;
      localStorage.setItem('bibi-lang', lang);
      document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
      nodes.forEach(({ node: textNode, base }) => {
        const key = base.trim();
        if (!key) return;
        const translated = lookup(key, lang === 'en' ? 'en' : 'zh');
        textNode.nodeValue = base.replace(key, translated);
      });
      const button = document.querySelector('#langBtn');
      if (button) button.textContent = lang === 'zh' ? 'EN' : '中';
      document.title = lang === 'en' ? 'BIBI Agent ID · $BIBI Mint' : 'BIBI Agent ID · $BIBI 铸造';
      onChange?.(lang);
    };
    apply(lang);
    document.querySelector('#langBtn')?.addEventListener('click', () => apply(lang === 'zh' ? 'en' : 'zh'));
    return { get: () => lang, set: apply };
  };
})();