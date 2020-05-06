export default `
    <?xml version="1.0" encoding="UTF-8" standalone="no" ?>
    <process name="1" displayName="1">
        <start layout="300,50" name="start" displayName="请假">
            <transition offset="B,T" to="askLeave" name="New Link" displayName="新建连接1" />
        </start>
        <task layout="362,321" name="askLeave" displayName="写个假条" assignee="apply.taskAssignee" performType="ALL">
            <transition offset="R,L" to="Condition1" name="New Link2" displayName="新建连接2" />
        </task>
        <condition layout="737,397" name="Condition1" displayName="新建条件1">
            <transition offset="T,L" to="leave" name="New Link3" displayName="新建连接3" />
        </condition>
        <end layout="769,100" name="leave" displayName="放假啦" />
    </process>
`;

// <transition offset="504,172 504,259.5 618,259.5 618,331" to="askForLeave" name="New Link1" displayName="新建连接1" />
// <transition offset="718,397 832.5,397 832.5,502 931,502" to="Condition1" name="New Link2" displayName="新建连接2" />
// <transition offset="1047,452 1047,402 897,402 897,105 950,105" to="finish" name="New Link3" displayName="新建连接3" />
