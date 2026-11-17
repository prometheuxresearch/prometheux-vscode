//@ts-nocheck
// Generated from ./grammar/Datalogpm.g4 by ANTLR 4.13.1

import {ParseTreeListener} from "antlr4";


import { ProgramContext } from "./DatalogpmParser";
import { ClauseContext } from "./DatalogpmParser";
import { CommentContext } from "./DatalogpmParser";
import { FactContext } from "./DatalogpmParser";
import { AnnotationBodyContext } from "./DatalogpmParser";
import { AnnotationContext } from "./DatalogpmParser";
import { TemporalAnnotationContext } from "./DatalogpmParser";
import { RruleContext } from "./DatalogpmParser";
import { HeadContext } from "./DatalogpmParser";
import { FalseHeadContext } from "./DatalogpmParser";
import { EgdHeadContext } from "./DatalogpmParser";
import { BodyContext } from "./DatalogpmParser";
import { LiteralContext } from "./DatalogpmParser";
import { PosLiteralContext } from "./DatalogpmParser";
import { NegLiteralContext } from "./DatalogpmParser";
import { DomStarContext } from "./DatalogpmParser";
import { DiamondMinusLiteralContext } from "./DatalogpmParser";
import { DiamondPlusLiteralContext } from "./DatalogpmParser";
import { BoxMinusLiteralContext } from "./DatalogpmParser";
import { BoxPlusLiteralContext } from "./DatalogpmParser";
import { TriangleUpLiteralContext } from "./DatalogpmParser";
import { TriangleDownLiteralContext } from "./DatalogpmParser";
import { CloseIntervalLiteralContext } from "./DatalogpmParser";
import { SelectIntervalLiteralContext } from "./DatalogpmParser";
import { SinceLiteralContext } from "./DatalogpmParser";
import { UntilLiteralContext } from "./DatalogpmParser";
import { ConditionContext } from "./DatalogpmParser";
import { GtConditionContext } from "./DatalogpmParser";
import { LtConditionContext } from "./DatalogpmParser";
import { GeConditionContext } from "./DatalogpmParser";
import { LeConditionContext } from "./DatalogpmParser";
import { EqConditionContext } from "./DatalogpmParser";
import { NeqConditionContext } from "./DatalogpmParser";
import { InConditionContext } from "./DatalogpmParser";
import { NotInConditionContext } from "./DatalogpmParser";
import { LtExpressionContext } from "./DatalogpmParser";
import { GtExpressionContext } from "./DatalogpmParser";
import { ExternalExpressionContext } from "./DatalogpmParser";
import { IntersectionExpressionContext } from "./DatalogpmParser";
import { MinusExpressionContext } from "./DatalogpmParser";
import { SkolemExpressionContext } from "./DatalogpmParser";
import { ProdExpressionContext } from "./DatalogpmParser";
import { LeExpressionContext } from "./DatalogpmParser";
import { EqEqExpressionContext } from "./DatalogpmParser";
import { NotExpressionContext } from "./DatalogpmParser";
import { DivExpressionContext } from "./DatalogpmParser";
import { PrecExpressionContext } from "./DatalogpmParser";
import { UnionExpressionContext } from "./DatalogpmParser";
import { StringOperatorsExpressionContext } from "./DatalogpmParser";
import { OrExpressionContext } from "./DatalogpmParser";
import { UnaryMinusExpressionContext } from "./DatalogpmParser";
import { NeqExpressionContext } from "./DatalogpmParser";
import { AndExpressionContext } from "./DatalogpmParser";
import { AggrExpressionContext } from "./DatalogpmParser";
import { GeExpressionContext } from "./DatalogpmParser";
import { PlusExpressionContext } from "./DatalogpmParser";
import { TermExpressionContext } from "./DatalogpmParser";
import { MsumAggExpressionContext } from "./DatalogpmParser";
import { MprodAggExpressionContext } from "./DatalogpmParser";
import { McountAggExpressionContext } from "./DatalogpmParser";
import { MunionAggExpressionContext } from "./DatalogpmParser";
import { MmaxAggExpressionContext } from "./DatalogpmParser";
import { MminAggExpressionContext } from "./DatalogpmParser";
import { UnionAggExpressionContext } from "./DatalogpmParser";
import { ListAggExpressionContext } from "./DatalogpmParser";
import { SetAggExpressionContext } from "./DatalogpmParser";
import { MinAggExpressionContext } from "./DatalogpmParser";
import { MaxAggExpressionContext } from "./DatalogpmParser";
import { SumAggExpressionContext } from "./DatalogpmParser";
import { ProdAggExpressionContext } from "./DatalogpmParser";
import { AvgAggExpressionContext } from "./DatalogpmParser";
import { CountAggExpressionContext } from "./DatalogpmParser";
import { SubstringExpressionContext } from "./DatalogpmParser";
import { ContainsExpressionContext } from "./DatalogpmParser";
import { StartsWithExpressionContext } from "./DatalogpmParser";
import { EndsWithExpressionContext } from "./DatalogpmParser";
import { ConcatExpressionContext } from "./DatalogpmParser";
import { StringLengthExpressionContext } from "./DatalogpmParser";
import { IndexOfExpressionContext } from "./DatalogpmParser";
import { VarListContext } from "./DatalogpmParser";
import { AnnotationAtomContext } from "./DatalogpmParser";
import { AtomAnnotationContext } from "./DatalogpmParser";
import { AtomContext } from "./DatalogpmParser";
import { TemporalIntervalContext } from "./DatalogpmParser";
import { TemporalRelativeIntervalNumberContext } from "./DatalogpmParser";
import { TemporalRelativeIntervalPeriodContext } from "./DatalogpmParser";
import { TemporalRelativeIntervalContext } from "./DatalogpmParser";
import { TemporalSelectIntervalContext } from "./DatalogpmParser";
import { TemporalTermOpenStartContext } from "./DatalogpmParser";
import { TemporalTermCloseStartContext } from "./DatalogpmParser";
import { TemporalTermOpenEndContext } from "./DatalogpmParser";
import { TemporalTermCloseEndContext } from "./DatalogpmParser";
import { TemporalTermStartValueDateContext } from "./DatalogpmParser";
import { TemporalTermStartValueNumberContext } from "./DatalogpmParser";
import { TemporalTermStartValueInftyContext } from "./DatalogpmParser";
import { TemporalTermEndValueDateContext } from "./DatalogpmParser";
import { TemporalTermEndValueNumberContext } from "./DatalogpmParser";
import { TemporalTermEndValueInftyContext } from "./DatalogpmParser";
import { TemporalSelectTermOpenStartContext } from "./DatalogpmParser";
import { TemporalSelectTermCloseStartContext } from "./DatalogpmParser";
import { TemporalSelectTermOpenEndContext } from "./DatalogpmParser";
import { TemporalSelectTermCloseEndContext } from "./DatalogpmParser";
import { TemporalSelectTermStartValueDateContext } from "./DatalogpmParser";
import { TemporalSelectTermStartValueNumberContext } from "./DatalogpmParser";
import { TemporalSelectTermStartValueInftyContext } from "./DatalogpmParser";
import { TemporalSelectTermEndValueDateContext } from "./DatalogpmParser";
import { TemporalSelectTermEndValueNumberContext } from "./DatalogpmParser";
import { TemporalSelectTermEndValueInftyContext } from "./DatalogpmParser";
import { TemporalRelativeTermOpenStartContext } from "./DatalogpmParser";
import { TemporalRelativeTermCloseStartContext } from "./DatalogpmParser";
import { TemporalRelativeTermOpenEndContext } from "./DatalogpmParser";
import { TemporalRelativeTermCloseEndContext } from "./DatalogpmParser";
import { TemporalRelativeTermStartValueNumberContext } from "./DatalogpmParser";
import { TemporalRelativeTermStartValueDateContext } from "./DatalogpmParser";
import { TemporalRelativeTermEndValueNumberContext } from "./DatalogpmParser";
import { TemporalRelativeTermEndValueInftyContext } from "./DatalogpmParser";
import { TemporalRelativeTermEndValueDateContext } from "./DatalogpmParser";
import { TemporalRelativeTermEndValueInftyDateContext } from "./DatalogpmParser";
import { TemporalTermDateContext } from "./DatalogpmParser";
import { TemporalTermNumberContext } from "./DatalogpmParser";
import { TemporalTermInftyContext } from "./DatalogpmParser";
import { DiamondMinusOperatorContext } from "./DatalogpmParser";
import { BoxMinusOperatorContext } from "./DatalogpmParser";
import { DiamondPlusOperatorContext } from "./DatalogpmParser";
import { BoxPlusOperatorContext } from "./DatalogpmParser";
import { SinceOperatorContext } from "./DatalogpmParser";
import { UntilOperatorContext } from "./DatalogpmParser";
import { TriangleUpOperatorContext } from "./DatalogpmParser";
import { TriangleDownOperatorContext } from "./DatalogpmParser";
import { CloseIntervalOperatorContext } from "./DatalogpmParser";
import { SelectIntervalOperatorContext } from "./DatalogpmParser";
import { DiamondPlusSymbolContext } from "./DatalogpmParser";
import { DiamondMinusSymbolContext } from "./DatalogpmParser";
import { SinceSymbolContext } from "./DatalogpmParser";
import { UntilSymbolContext } from "./DatalogpmParser";
import { BoxMinusSymbolContext } from "./DatalogpmParser";
import { BoxPlusSymbolContext } from "./DatalogpmParser";
import { TriangleUpSymbolContext } from "./DatalogpmParser";
import { TriangleDownSymbolContext } from "./DatalogpmParser";
import { CloseIntervalSymbolContext } from "./DatalogpmParser";
import { SelectIntervalSymbolContext } from "./DatalogpmParser";
import { TimeGroupInfoContext } from "./DatalogpmParser";
import { TimeGroupInfoIntegerContext } from "./DatalogpmParser";
import { TimeGroupInfoDoubleContext } from "./DatalogpmParser";
import { TimeUnitContext } from "./DatalogpmParser";
import { TermContext } from "./DatalogpmParser";
import { StringConstTermContext } from "./DatalogpmParser";
import { IntegerConstTermContext } from "./DatalogpmParser";
import { DoubleConstTermContext } from "./DatalogpmParser";
import { BooleanConstTermContext } from "./DatalogpmParser";
import { DateConstTermContext } from "./DatalogpmParser";
import { ListContext } from "./DatalogpmParser";
import { EmptySetContext } from "./DatalogpmParser";
import { StringSetContext } from "./DatalogpmParser";
import { IntegerSetContext } from "./DatalogpmParser";
import { DoubleSetContext } from "./DatalogpmParser";
import { DateSetContext } from "./DatalogpmParser";
import { VarTermContext } from "./DatalogpmParser";
import { AnonTermContext } from "./DatalogpmParser";
import { ParamTermContext } from "./DatalogpmParser";
import { FalseTermContext } from "./DatalogpmParser";
import { Iso8601DurationDefaultContext } from "./DatalogpmParser";
import { Iso8601DurationWeekContext } from "./DatalogpmParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `DatalogpmParser`.
 */
export default class DatalogpmListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `DatalogpmParser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.clause`.
	 * @param ctx the parse tree
	 */
	enterClause?: (ctx: ClauseContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.clause`.
	 * @param ctx the parse tree
	 */
	exitClause?: (ctx: ClauseContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.comment`.
	 * @param ctx the parse tree
	 */
	enterComment?: (ctx: CommentContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.comment`.
	 * @param ctx the parse tree
	 */
	exitComment?: (ctx: CommentContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.fact`.
	 * @param ctx the parse tree
	 */
	enterFact?: (ctx: FactContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.fact`.
	 * @param ctx the parse tree
	 */
	exitFact?: (ctx: FactContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.annotationBody`.
	 * @param ctx the parse tree
	 */
	enterAnnotationBody?: (ctx: AnnotationBodyContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.annotationBody`.
	 * @param ctx the parse tree
	 */
	exitAnnotationBody?: (ctx: AnnotationBodyContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.annotation`.
	 * @param ctx the parse tree
	 */
	enterAnnotation?: (ctx: AnnotationContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.annotation`.
	 * @param ctx the parse tree
	 */
	exitAnnotation?: (ctx: AnnotationContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.temporalAnnotation`.
	 * @param ctx the parse tree
	 */
	enterTemporalAnnotation?: (ctx: TemporalAnnotationContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.temporalAnnotation`.
	 * @param ctx the parse tree
	 */
	exitTemporalAnnotation?: (ctx: TemporalAnnotationContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.rrule`.
	 * @param ctx the parse tree
	 */
	enterRrule?: (ctx: RruleContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.rrule`.
	 * @param ctx the parse tree
	 */
	exitRrule?: (ctx: RruleContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.head`.
	 * @param ctx the parse tree
	 */
	enterHead?: (ctx: HeadContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.head`.
	 * @param ctx the parse tree
	 */
	exitHead?: (ctx: HeadContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.falseHead`.
	 * @param ctx the parse tree
	 */
	enterFalseHead?: (ctx: FalseHeadContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.falseHead`.
	 * @param ctx the parse tree
	 */
	exitFalseHead?: (ctx: FalseHeadContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.egdHead`.
	 * @param ctx the parse tree
	 */
	enterEgdHead?: (ctx: EgdHeadContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.egdHead`.
	 * @param ctx the parse tree
	 */
	exitEgdHead?: (ctx: EgdHeadContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.body`.
	 * @param ctx the parse tree
	 */
	enterBody?: (ctx: BodyContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.body`.
	 * @param ctx the parse tree
	 */
	exitBody?: (ctx: BodyContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.literal`.
	 * @param ctx the parse tree
	 */
	enterLiteral?: (ctx: LiteralContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.literal`.
	 * @param ctx the parse tree
	 */
	exitLiteral?: (ctx: LiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `PosLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	enterPosLiteral?: (ctx: PosLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `PosLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	exitPosLiteral?: (ctx: PosLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `NegLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	enterNegLiteral?: (ctx: NegLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `NegLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	exitNegLiteral?: (ctx: NegLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `domStar`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	enterDomStar?: (ctx: DomStarContext) => void;
	/**
	 * Exit a parse tree produced by the `domStar`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	exitDomStar?: (ctx: DomStarContext) => void;
	/**
	 * Enter a parse tree produced by the `diamondMinusLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	enterDiamondMinusLiteral?: (ctx: DiamondMinusLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `diamondMinusLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	exitDiamondMinusLiteral?: (ctx: DiamondMinusLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `diamondPlusLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	enterDiamondPlusLiteral?: (ctx: DiamondPlusLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `diamondPlusLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	exitDiamondPlusLiteral?: (ctx: DiamondPlusLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `boxMinusLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	enterBoxMinusLiteral?: (ctx: BoxMinusLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `boxMinusLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	exitBoxMinusLiteral?: (ctx: BoxMinusLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `boxPlusLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	enterBoxPlusLiteral?: (ctx: BoxPlusLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `boxPlusLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	exitBoxPlusLiteral?: (ctx: BoxPlusLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `triangleUpLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	enterTriangleUpLiteral?: (ctx: TriangleUpLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `triangleUpLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	exitTriangleUpLiteral?: (ctx: TriangleUpLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `triangleDownLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	enterTriangleDownLiteral?: (ctx: TriangleDownLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `triangleDownLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	exitTriangleDownLiteral?: (ctx: TriangleDownLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `closeIntervalLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	enterCloseIntervalLiteral?: (ctx: CloseIntervalLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `closeIntervalLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	exitCloseIntervalLiteral?: (ctx: CloseIntervalLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `selectIntervalLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	enterSelectIntervalLiteral?: (ctx: SelectIntervalLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `selectIntervalLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	exitSelectIntervalLiteral?: (ctx: SelectIntervalLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `sinceLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	enterSinceLiteral?: (ctx: SinceLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `sinceLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	exitSinceLiteral?: (ctx: SinceLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `untilLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	enterUntilLiteral?: (ctx: UntilLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `untilLiteral`
	 * labeled alternative in `DatalogpmParser.literalInner`.
	 * @param ctx the parse tree
	 */
	exitUntilLiteral?: (ctx: UntilLiteralContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.condition`.
	 * @param ctx the parse tree
	 */
	enterCondition?: (ctx: ConditionContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.condition`.
	 * @param ctx the parse tree
	 */
	exitCondition?: (ctx: ConditionContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.gtCondition`.
	 * @param ctx the parse tree
	 */
	enterGtCondition?: (ctx: GtConditionContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.gtCondition`.
	 * @param ctx the parse tree
	 */
	exitGtCondition?: (ctx: GtConditionContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.ltCondition`.
	 * @param ctx the parse tree
	 */
	enterLtCondition?: (ctx: LtConditionContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.ltCondition`.
	 * @param ctx the parse tree
	 */
	exitLtCondition?: (ctx: LtConditionContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.geCondition`.
	 * @param ctx the parse tree
	 */
	enterGeCondition?: (ctx: GeConditionContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.geCondition`.
	 * @param ctx the parse tree
	 */
	exitGeCondition?: (ctx: GeConditionContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.leCondition`.
	 * @param ctx the parse tree
	 */
	enterLeCondition?: (ctx: LeConditionContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.leCondition`.
	 * @param ctx the parse tree
	 */
	exitLeCondition?: (ctx: LeConditionContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.eqCondition`.
	 * @param ctx the parse tree
	 */
	enterEqCondition?: (ctx: EqConditionContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.eqCondition`.
	 * @param ctx the parse tree
	 */
	exitEqCondition?: (ctx: EqConditionContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.neqCondition`.
	 * @param ctx the parse tree
	 */
	enterNeqCondition?: (ctx: NeqConditionContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.neqCondition`.
	 * @param ctx the parse tree
	 */
	exitNeqCondition?: (ctx: NeqConditionContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.inCondition`.
	 * @param ctx the parse tree
	 */
	enterInCondition?: (ctx: InConditionContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.inCondition`.
	 * @param ctx the parse tree
	 */
	exitInCondition?: (ctx: InConditionContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.notInCondition`.
	 * @param ctx the parse tree
	 */
	enterNotInCondition?: (ctx: NotInConditionContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.notInCondition`.
	 * @param ctx the parse tree
	 */
	exitNotInCondition?: (ctx: NotInConditionContext) => void;
	/**
	 * Enter a parse tree produced by the `ltExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	enterLtExpression?: (ctx: LtExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ltExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	exitLtExpression?: (ctx: LtExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `gtExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	enterGtExpression?: (ctx: GtExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `gtExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	exitGtExpression?: (ctx: GtExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `externalExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExternalExpression?: (ctx: ExternalExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `externalExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExternalExpression?: (ctx: ExternalExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `intersectionExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	enterIntersectionExpression?: (ctx: IntersectionExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `intersectionExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	exitIntersectionExpression?: (ctx: IntersectionExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `minusExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	enterMinusExpression?: (ctx: MinusExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `minusExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	exitMinusExpression?: (ctx: MinusExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `skolemExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	enterSkolemExpression?: (ctx: SkolemExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `skolemExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	exitSkolemExpression?: (ctx: SkolemExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `prodExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	enterProdExpression?: (ctx: ProdExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `prodExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	exitProdExpression?: (ctx: ProdExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `leExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	enterLeExpression?: (ctx: LeExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `leExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	exitLeExpression?: (ctx: LeExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `eqEqExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	enterEqEqExpression?: (ctx: EqEqExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `eqEqExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	exitEqEqExpression?: (ctx: EqEqExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `notExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	enterNotExpression?: (ctx: NotExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `notExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	exitNotExpression?: (ctx: NotExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `divExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	enterDivExpression?: (ctx: DivExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `divExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	exitDivExpression?: (ctx: DivExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `precExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	enterPrecExpression?: (ctx: PrecExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `precExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	exitPrecExpression?: (ctx: PrecExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `unionExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	enterUnionExpression?: (ctx: UnionExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `unionExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	exitUnionExpression?: (ctx: UnionExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `stringOperatorsExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	enterStringOperatorsExpression?: (ctx: StringOperatorsExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `stringOperatorsExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	exitStringOperatorsExpression?: (ctx: StringOperatorsExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `orExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	enterOrExpression?: (ctx: OrExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `orExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	exitOrExpression?: (ctx: OrExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `unaryMinusExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	enterUnaryMinusExpression?: (ctx: UnaryMinusExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `unaryMinusExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	exitUnaryMinusExpression?: (ctx: UnaryMinusExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `neqExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	enterNeqExpression?: (ctx: NeqExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `neqExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	exitNeqExpression?: (ctx: NeqExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `andExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAndExpression?: (ctx: AndExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `andExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAndExpression?: (ctx: AndExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `aggrExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAggrExpression?: (ctx: AggrExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `aggrExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAggrExpression?: (ctx: AggrExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `geExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	enterGeExpression?: (ctx: GeExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `geExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	exitGeExpression?: (ctx: GeExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `plusExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	enterPlusExpression?: (ctx: PlusExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `plusExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	exitPlusExpression?: (ctx: PlusExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `termExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	enterTermExpression?: (ctx: TermExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `termExpression`
	 * labeled alternative in `DatalogpmParser.expression`.
	 * @param ctx the parse tree
	 */
	exitTermExpression?: (ctx: TermExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `msumAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	enterMsumAggExpression?: (ctx: MsumAggExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `msumAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	exitMsumAggExpression?: (ctx: MsumAggExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `mprodAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	enterMprodAggExpression?: (ctx: MprodAggExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `mprodAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	exitMprodAggExpression?: (ctx: MprodAggExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `mcountAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	enterMcountAggExpression?: (ctx: McountAggExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `mcountAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	exitMcountAggExpression?: (ctx: McountAggExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `munionAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	enterMunionAggExpression?: (ctx: MunionAggExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `munionAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	exitMunionAggExpression?: (ctx: MunionAggExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `mmaxAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	enterMmaxAggExpression?: (ctx: MmaxAggExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `mmaxAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	exitMmaxAggExpression?: (ctx: MmaxAggExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `mminAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	enterMminAggExpression?: (ctx: MminAggExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `mminAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	exitMminAggExpression?: (ctx: MminAggExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `unionAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	enterUnionAggExpression?: (ctx: UnionAggExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `unionAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	exitUnionAggExpression?: (ctx: UnionAggExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `listAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	enterListAggExpression?: (ctx: ListAggExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `listAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	exitListAggExpression?: (ctx: ListAggExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `setAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	enterSetAggExpression?: (ctx: SetAggExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `setAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	exitSetAggExpression?: (ctx: SetAggExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `minAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	enterMinAggExpression?: (ctx: MinAggExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `minAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	exitMinAggExpression?: (ctx: MinAggExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `maxAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	enterMaxAggExpression?: (ctx: MaxAggExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `maxAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	exitMaxAggExpression?: (ctx: MaxAggExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `sumAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	enterSumAggExpression?: (ctx: SumAggExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `sumAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	exitSumAggExpression?: (ctx: SumAggExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `prodAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	enterProdAggExpression?: (ctx: ProdAggExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `prodAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	exitProdAggExpression?: (ctx: ProdAggExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `avgAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	enterAvgAggExpression?: (ctx: AvgAggExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `avgAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	exitAvgAggExpression?: (ctx: AvgAggExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `countAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	enterCountAggExpression?: (ctx: CountAggExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `countAggExpression`
	 * labeled alternative in `DatalogpmParser.aggregation`.
	 * @param ctx the parse tree
	 */
	exitCountAggExpression?: (ctx: CountAggExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `substringExpression`
	 * labeled alternative in `DatalogpmParser.stringOperators`.
	 * @param ctx the parse tree
	 */
	enterSubstringExpression?: (ctx: SubstringExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `substringExpression`
	 * labeled alternative in `DatalogpmParser.stringOperators`.
	 * @param ctx the parse tree
	 */
	exitSubstringExpression?: (ctx: SubstringExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `containsExpression`
	 * labeled alternative in `DatalogpmParser.stringOperators`.
	 * @param ctx the parse tree
	 */
	enterContainsExpression?: (ctx: ContainsExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `containsExpression`
	 * labeled alternative in `DatalogpmParser.stringOperators`.
	 * @param ctx the parse tree
	 */
	exitContainsExpression?: (ctx: ContainsExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `startsWithExpression`
	 * labeled alternative in `DatalogpmParser.stringOperators`.
	 * @param ctx the parse tree
	 */
	enterStartsWithExpression?: (ctx: StartsWithExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `startsWithExpression`
	 * labeled alternative in `DatalogpmParser.stringOperators`.
	 * @param ctx the parse tree
	 */
	exitStartsWithExpression?: (ctx: StartsWithExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `endsWithExpression`
	 * labeled alternative in `DatalogpmParser.stringOperators`.
	 * @param ctx the parse tree
	 */
	enterEndsWithExpression?: (ctx: EndsWithExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `endsWithExpression`
	 * labeled alternative in `DatalogpmParser.stringOperators`.
	 * @param ctx the parse tree
	 */
	exitEndsWithExpression?: (ctx: EndsWithExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `concatExpression`
	 * labeled alternative in `DatalogpmParser.stringOperators`.
	 * @param ctx the parse tree
	 */
	enterConcatExpression?: (ctx: ConcatExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `concatExpression`
	 * labeled alternative in `DatalogpmParser.stringOperators`.
	 * @param ctx the parse tree
	 */
	exitConcatExpression?: (ctx: ConcatExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `stringLengthExpression`
	 * labeled alternative in `DatalogpmParser.stringOperators`.
	 * @param ctx the parse tree
	 */
	enterStringLengthExpression?: (ctx: StringLengthExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `stringLengthExpression`
	 * labeled alternative in `DatalogpmParser.stringOperators`.
	 * @param ctx the parse tree
	 */
	exitStringLengthExpression?: (ctx: StringLengthExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `indexOfExpression`
	 * labeled alternative in `DatalogpmParser.stringOperators`.
	 * @param ctx the parse tree
	 */
	enterIndexOfExpression?: (ctx: IndexOfExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `indexOfExpression`
	 * labeled alternative in `DatalogpmParser.stringOperators`.
	 * @param ctx the parse tree
	 */
	exitIndexOfExpression?: (ctx: IndexOfExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.varList`.
	 * @param ctx the parse tree
	 */
	enterVarList?: (ctx: VarListContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.varList`.
	 * @param ctx the parse tree
	 */
	exitVarList?: (ctx: VarListContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.annotationAtom`.
	 * @param ctx the parse tree
	 */
	enterAnnotationAtom?: (ctx: AnnotationAtomContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.annotationAtom`.
	 * @param ctx the parse tree
	 */
	exitAnnotationAtom?: (ctx: AnnotationAtomContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.atomAnnotation`.
	 * @param ctx the parse tree
	 */
	enterAtomAnnotation?: (ctx: AtomAnnotationContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.atomAnnotation`.
	 * @param ctx the parse tree
	 */
	exitAtomAnnotation?: (ctx: AtomAnnotationContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.atom`.
	 * @param ctx the parse tree
	 */
	enterAtom?: (ctx: AtomContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.atom`.
	 * @param ctx the parse tree
	 */
	exitAtom?: (ctx: AtomContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.temporalInterval`.
	 * @param ctx the parse tree
	 */
	enterTemporalInterval?: (ctx: TemporalIntervalContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.temporalInterval`.
	 * @param ctx the parse tree
	 */
	exitTemporalInterval?: (ctx: TemporalIntervalContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.temporalRelativeIntervalNumber`.
	 * @param ctx the parse tree
	 */
	enterTemporalRelativeIntervalNumber?: (ctx: TemporalRelativeIntervalNumberContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.temporalRelativeIntervalNumber`.
	 * @param ctx the parse tree
	 */
	exitTemporalRelativeIntervalNumber?: (ctx: TemporalRelativeIntervalNumberContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.temporalRelativeIntervalPeriod`.
	 * @param ctx the parse tree
	 */
	enterTemporalRelativeIntervalPeriod?: (ctx: TemporalRelativeIntervalPeriodContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.temporalRelativeIntervalPeriod`.
	 * @param ctx the parse tree
	 */
	exitTemporalRelativeIntervalPeriod?: (ctx: TemporalRelativeIntervalPeriodContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.temporalRelativeInterval`.
	 * @param ctx the parse tree
	 */
	enterTemporalRelativeInterval?: (ctx: TemporalRelativeIntervalContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.temporalRelativeInterval`.
	 * @param ctx the parse tree
	 */
	exitTemporalRelativeInterval?: (ctx: TemporalRelativeIntervalContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.temporalSelectInterval`.
	 * @param ctx the parse tree
	 */
	enterTemporalSelectInterval?: (ctx: TemporalSelectIntervalContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.temporalSelectInterval`.
	 * @param ctx the parse tree
	 */
	exitTemporalSelectInterval?: (ctx: TemporalSelectIntervalContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalTermOpenStart`
	 * labeled alternative in `DatalogpmParser.temporalTermStart`.
	 * @param ctx the parse tree
	 */
	enterTemporalTermOpenStart?: (ctx: TemporalTermOpenStartContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalTermOpenStart`
	 * labeled alternative in `DatalogpmParser.temporalTermStart`.
	 * @param ctx the parse tree
	 */
	exitTemporalTermOpenStart?: (ctx: TemporalTermOpenStartContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalTermCloseStart`
	 * labeled alternative in `DatalogpmParser.temporalTermStart`.
	 * @param ctx the parse tree
	 */
	enterTemporalTermCloseStart?: (ctx: TemporalTermCloseStartContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalTermCloseStart`
	 * labeled alternative in `DatalogpmParser.temporalTermStart`.
	 * @param ctx the parse tree
	 */
	exitTemporalTermCloseStart?: (ctx: TemporalTermCloseStartContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalTermOpenEnd`
	 * labeled alternative in `DatalogpmParser.temporalTermEnd`.
	 * @param ctx the parse tree
	 */
	enterTemporalTermOpenEnd?: (ctx: TemporalTermOpenEndContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalTermOpenEnd`
	 * labeled alternative in `DatalogpmParser.temporalTermEnd`.
	 * @param ctx the parse tree
	 */
	exitTemporalTermOpenEnd?: (ctx: TemporalTermOpenEndContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalTermCloseEnd`
	 * labeled alternative in `DatalogpmParser.temporalTermEnd`.
	 * @param ctx the parse tree
	 */
	enterTemporalTermCloseEnd?: (ctx: TemporalTermCloseEndContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalTermCloseEnd`
	 * labeled alternative in `DatalogpmParser.temporalTermEnd`.
	 * @param ctx the parse tree
	 */
	exitTemporalTermCloseEnd?: (ctx: TemporalTermCloseEndContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalTermStartValueDate`
	 * labeled alternative in `DatalogpmParser.temporalTermStartValue`.
	 * @param ctx the parse tree
	 */
	enterTemporalTermStartValueDate?: (ctx: TemporalTermStartValueDateContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalTermStartValueDate`
	 * labeled alternative in `DatalogpmParser.temporalTermStartValue`.
	 * @param ctx the parse tree
	 */
	exitTemporalTermStartValueDate?: (ctx: TemporalTermStartValueDateContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalTermStartValueNumber`
	 * labeled alternative in `DatalogpmParser.temporalTermStartValue`.
	 * @param ctx the parse tree
	 */
	enterTemporalTermStartValueNumber?: (ctx: TemporalTermStartValueNumberContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalTermStartValueNumber`
	 * labeled alternative in `DatalogpmParser.temporalTermStartValue`.
	 * @param ctx the parse tree
	 */
	exitTemporalTermStartValueNumber?: (ctx: TemporalTermStartValueNumberContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalTermStartValueInfty`
	 * labeled alternative in `DatalogpmParser.temporalTermStartValue`.
	 * @param ctx the parse tree
	 */
	enterTemporalTermStartValueInfty?: (ctx: TemporalTermStartValueInftyContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalTermStartValueInfty`
	 * labeled alternative in `DatalogpmParser.temporalTermStartValue`.
	 * @param ctx the parse tree
	 */
	exitTemporalTermStartValueInfty?: (ctx: TemporalTermStartValueInftyContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalTermEndValueDate`
	 * labeled alternative in `DatalogpmParser.temporalTermEndValue`.
	 * @param ctx the parse tree
	 */
	enterTemporalTermEndValueDate?: (ctx: TemporalTermEndValueDateContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalTermEndValueDate`
	 * labeled alternative in `DatalogpmParser.temporalTermEndValue`.
	 * @param ctx the parse tree
	 */
	exitTemporalTermEndValueDate?: (ctx: TemporalTermEndValueDateContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalTermEndValueNumber`
	 * labeled alternative in `DatalogpmParser.temporalTermEndValue`.
	 * @param ctx the parse tree
	 */
	enterTemporalTermEndValueNumber?: (ctx: TemporalTermEndValueNumberContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalTermEndValueNumber`
	 * labeled alternative in `DatalogpmParser.temporalTermEndValue`.
	 * @param ctx the parse tree
	 */
	exitTemporalTermEndValueNumber?: (ctx: TemporalTermEndValueNumberContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalTermEndValueInfty`
	 * labeled alternative in `DatalogpmParser.temporalTermEndValue`.
	 * @param ctx the parse tree
	 */
	enterTemporalTermEndValueInfty?: (ctx: TemporalTermEndValueInftyContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalTermEndValueInfty`
	 * labeled alternative in `DatalogpmParser.temporalTermEndValue`.
	 * @param ctx the parse tree
	 */
	exitTemporalTermEndValueInfty?: (ctx: TemporalTermEndValueInftyContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalSelectTermOpenStart`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermStart`.
	 * @param ctx the parse tree
	 */
	enterTemporalSelectTermOpenStart?: (ctx: TemporalSelectTermOpenStartContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalSelectTermOpenStart`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermStart`.
	 * @param ctx the parse tree
	 */
	exitTemporalSelectTermOpenStart?: (ctx: TemporalSelectTermOpenStartContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalSelectTermCloseStart`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermStart`.
	 * @param ctx the parse tree
	 */
	enterTemporalSelectTermCloseStart?: (ctx: TemporalSelectTermCloseStartContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalSelectTermCloseStart`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermStart`.
	 * @param ctx the parse tree
	 */
	exitTemporalSelectTermCloseStart?: (ctx: TemporalSelectTermCloseStartContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalSelectTermOpenEnd`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermEnd`.
	 * @param ctx the parse tree
	 */
	enterTemporalSelectTermOpenEnd?: (ctx: TemporalSelectTermOpenEndContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalSelectTermOpenEnd`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermEnd`.
	 * @param ctx the parse tree
	 */
	exitTemporalSelectTermOpenEnd?: (ctx: TemporalSelectTermOpenEndContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalSelectTermCloseEnd`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermEnd`.
	 * @param ctx the parse tree
	 */
	enterTemporalSelectTermCloseEnd?: (ctx: TemporalSelectTermCloseEndContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalSelectTermCloseEnd`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermEnd`.
	 * @param ctx the parse tree
	 */
	exitTemporalSelectTermCloseEnd?: (ctx: TemporalSelectTermCloseEndContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalSelectTermStartValueDate`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermStartValue`.
	 * @param ctx the parse tree
	 */
	enterTemporalSelectTermStartValueDate?: (ctx: TemporalSelectTermStartValueDateContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalSelectTermStartValueDate`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermStartValue`.
	 * @param ctx the parse tree
	 */
	exitTemporalSelectTermStartValueDate?: (ctx: TemporalSelectTermStartValueDateContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalSelectTermStartValueNumber`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermStartValue`.
	 * @param ctx the parse tree
	 */
	enterTemporalSelectTermStartValueNumber?: (ctx: TemporalSelectTermStartValueNumberContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalSelectTermStartValueNumber`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermStartValue`.
	 * @param ctx the parse tree
	 */
	exitTemporalSelectTermStartValueNumber?: (ctx: TemporalSelectTermStartValueNumberContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalSelectTermStartValueInfty`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermStartValue`.
	 * @param ctx the parse tree
	 */
	enterTemporalSelectTermStartValueInfty?: (ctx: TemporalSelectTermStartValueInftyContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalSelectTermStartValueInfty`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermStartValue`.
	 * @param ctx the parse tree
	 */
	exitTemporalSelectTermStartValueInfty?: (ctx: TemporalSelectTermStartValueInftyContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalSelectTermEndValueDate`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermEndValue`.
	 * @param ctx the parse tree
	 */
	enterTemporalSelectTermEndValueDate?: (ctx: TemporalSelectTermEndValueDateContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalSelectTermEndValueDate`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermEndValue`.
	 * @param ctx the parse tree
	 */
	exitTemporalSelectTermEndValueDate?: (ctx: TemporalSelectTermEndValueDateContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalSelectTermEndValueNumber`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermEndValue`.
	 * @param ctx the parse tree
	 */
	enterTemporalSelectTermEndValueNumber?: (ctx: TemporalSelectTermEndValueNumberContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalSelectTermEndValueNumber`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermEndValue`.
	 * @param ctx the parse tree
	 */
	exitTemporalSelectTermEndValueNumber?: (ctx: TemporalSelectTermEndValueNumberContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalSelectTermEndValueInfty`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermEndValue`.
	 * @param ctx the parse tree
	 */
	enterTemporalSelectTermEndValueInfty?: (ctx: TemporalSelectTermEndValueInftyContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalSelectTermEndValueInfty`
	 * labeled alternative in `DatalogpmParser.temporalSelectTermEndValue`.
	 * @param ctx the parse tree
	 */
	exitTemporalSelectTermEndValueInfty?: (ctx: TemporalSelectTermEndValueInftyContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalRelativeTermOpenStart`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermStart`.
	 * @param ctx the parse tree
	 */
	enterTemporalRelativeTermOpenStart?: (ctx: TemporalRelativeTermOpenStartContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalRelativeTermOpenStart`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermStart`.
	 * @param ctx the parse tree
	 */
	exitTemporalRelativeTermOpenStart?: (ctx: TemporalRelativeTermOpenStartContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalRelativeTermCloseStart`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermStart`.
	 * @param ctx the parse tree
	 */
	enterTemporalRelativeTermCloseStart?: (ctx: TemporalRelativeTermCloseStartContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalRelativeTermCloseStart`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermStart`.
	 * @param ctx the parse tree
	 */
	exitTemporalRelativeTermCloseStart?: (ctx: TemporalRelativeTermCloseStartContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalRelativeTermOpenEnd`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermEnd`.
	 * @param ctx the parse tree
	 */
	enterTemporalRelativeTermOpenEnd?: (ctx: TemporalRelativeTermOpenEndContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalRelativeTermOpenEnd`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermEnd`.
	 * @param ctx the parse tree
	 */
	exitTemporalRelativeTermOpenEnd?: (ctx: TemporalRelativeTermOpenEndContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalRelativeTermCloseEnd`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermEnd`.
	 * @param ctx the parse tree
	 */
	enterTemporalRelativeTermCloseEnd?: (ctx: TemporalRelativeTermCloseEndContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalRelativeTermCloseEnd`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermEnd`.
	 * @param ctx the parse tree
	 */
	exitTemporalRelativeTermCloseEnd?: (ctx: TemporalRelativeTermCloseEndContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalRelativeTermStartValueNumber`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermStartValue`.
	 * @param ctx the parse tree
	 */
	enterTemporalRelativeTermStartValueNumber?: (ctx: TemporalRelativeTermStartValueNumberContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalRelativeTermStartValueNumber`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermStartValue`.
	 * @param ctx the parse tree
	 */
	exitTemporalRelativeTermStartValueNumber?: (ctx: TemporalRelativeTermStartValueNumberContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalRelativeTermStartValueDate`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermStartDate`.
	 * @param ctx the parse tree
	 */
	enterTemporalRelativeTermStartValueDate?: (ctx: TemporalRelativeTermStartValueDateContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalRelativeTermStartValueDate`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermStartDate`.
	 * @param ctx the parse tree
	 */
	exitTemporalRelativeTermStartValueDate?: (ctx: TemporalRelativeTermStartValueDateContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalRelativeTermEndValueNumber`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermEndValue`.
	 * @param ctx the parse tree
	 */
	enterTemporalRelativeTermEndValueNumber?: (ctx: TemporalRelativeTermEndValueNumberContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalRelativeTermEndValueNumber`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermEndValue`.
	 * @param ctx the parse tree
	 */
	exitTemporalRelativeTermEndValueNumber?: (ctx: TemporalRelativeTermEndValueNumberContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalRelativeTermEndValueInfty`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermEndValue`.
	 * @param ctx the parse tree
	 */
	enterTemporalRelativeTermEndValueInfty?: (ctx: TemporalRelativeTermEndValueInftyContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalRelativeTermEndValueInfty`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermEndValue`.
	 * @param ctx the parse tree
	 */
	exitTemporalRelativeTermEndValueInfty?: (ctx: TemporalRelativeTermEndValueInftyContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalRelativeTermEndValueDate`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermEndDate`.
	 * @param ctx the parse tree
	 */
	enterTemporalRelativeTermEndValueDate?: (ctx: TemporalRelativeTermEndValueDateContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalRelativeTermEndValueDate`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermEndDate`.
	 * @param ctx the parse tree
	 */
	exitTemporalRelativeTermEndValueDate?: (ctx: TemporalRelativeTermEndValueDateContext) => void;
	/**
	 * Enter a parse tree produced by the `temporalRelativeTermEndValueInftyDate`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermEndDate`.
	 * @param ctx the parse tree
	 */
	enterTemporalRelativeTermEndValueInftyDate?: (ctx: TemporalRelativeTermEndValueInftyDateContext) => void;
	/**
	 * Exit a parse tree produced by the `temporalRelativeTermEndValueInftyDate`
	 * labeled alternative in `DatalogpmParser.temporalRelativeTermEndDate`.
	 * @param ctx the parse tree
	 */
	exitTemporalRelativeTermEndValueInftyDate?: (ctx: TemporalRelativeTermEndValueInftyDateContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.temporalTermDate`.
	 * @param ctx the parse tree
	 */
	enterTemporalTermDate?: (ctx: TemporalTermDateContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.temporalTermDate`.
	 * @param ctx the parse tree
	 */
	exitTemporalTermDate?: (ctx: TemporalTermDateContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.temporalTermNumber`.
	 * @param ctx the parse tree
	 */
	enterTemporalTermNumber?: (ctx: TemporalTermNumberContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.temporalTermNumber`.
	 * @param ctx the parse tree
	 */
	exitTemporalTermNumber?: (ctx: TemporalTermNumberContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.temporalTermInfty`.
	 * @param ctx the parse tree
	 */
	enterTemporalTermInfty?: (ctx: TemporalTermInftyContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.temporalTermInfty`.
	 * @param ctx the parse tree
	 */
	exitTemporalTermInfty?: (ctx: TemporalTermInftyContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.diamondMinusOperator`.
	 * @param ctx the parse tree
	 */
	enterDiamondMinusOperator?: (ctx: DiamondMinusOperatorContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.diamondMinusOperator`.
	 * @param ctx the parse tree
	 */
	exitDiamondMinusOperator?: (ctx: DiamondMinusOperatorContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.boxMinusOperator`.
	 * @param ctx the parse tree
	 */
	enterBoxMinusOperator?: (ctx: BoxMinusOperatorContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.boxMinusOperator`.
	 * @param ctx the parse tree
	 */
	exitBoxMinusOperator?: (ctx: BoxMinusOperatorContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.diamondPlusOperator`.
	 * @param ctx the parse tree
	 */
	enterDiamondPlusOperator?: (ctx: DiamondPlusOperatorContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.diamondPlusOperator`.
	 * @param ctx the parse tree
	 */
	exitDiamondPlusOperator?: (ctx: DiamondPlusOperatorContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.boxPlusOperator`.
	 * @param ctx the parse tree
	 */
	enterBoxPlusOperator?: (ctx: BoxPlusOperatorContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.boxPlusOperator`.
	 * @param ctx the parse tree
	 */
	exitBoxPlusOperator?: (ctx: BoxPlusOperatorContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.sinceOperator`.
	 * @param ctx the parse tree
	 */
	enterSinceOperator?: (ctx: SinceOperatorContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.sinceOperator`.
	 * @param ctx the parse tree
	 */
	exitSinceOperator?: (ctx: SinceOperatorContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.untilOperator`.
	 * @param ctx the parse tree
	 */
	enterUntilOperator?: (ctx: UntilOperatorContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.untilOperator`.
	 * @param ctx the parse tree
	 */
	exitUntilOperator?: (ctx: UntilOperatorContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.triangleUpOperator`.
	 * @param ctx the parse tree
	 */
	enterTriangleUpOperator?: (ctx: TriangleUpOperatorContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.triangleUpOperator`.
	 * @param ctx the parse tree
	 */
	exitTriangleUpOperator?: (ctx: TriangleUpOperatorContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.triangleDownOperator`.
	 * @param ctx the parse tree
	 */
	enterTriangleDownOperator?: (ctx: TriangleDownOperatorContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.triangleDownOperator`.
	 * @param ctx the parse tree
	 */
	exitTriangleDownOperator?: (ctx: TriangleDownOperatorContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.closeIntervalOperator`.
	 * @param ctx the parse tree
	 */
	enterCloseIntervalOperator?: (ctx: CloseIntervalOperatorContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.closeIntervalOperator`.
	 * @param ctx the parse tree
	 */
	exitCloseIntervalOperator?: (ctx: CloseIntervalOperatorContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.selectIntervalOperator`.
	 * @param ctx the parse tree
	 */
	enterSelectIntervalOperator?: (ctx: SelectIntervalOperatorContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.selectIntervalOperator`.
	 * @param ctx the parse tree
	 */
	exitSelectIntervalOperator?: (ctx: SelectIntervalOperatorContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.diamondPlusSymbol`.
	 * @param ctx the parse tree
	 */
	enterDiamondPlusSymbol?: (ctx: DiamondPlusSymbolContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.diamondPlusSymbol`.
	 * @param ctx the parse tree
	 */
	exitDiamondPlusSymbol?: (ctx: DiamondPlusSymbolContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.diamondMinusSymbol`.
	 * @param ctx the parse tree
	 */
	enterDiamondMinusSymbol?: (ctx: DiamondMinusSymbolContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.diamondMinusSymbol`.
	 * @param ctx the parse tree
	 */
	exitDiamondMinusSymbol?: (ctx: DiamondMinusSymbolContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.sinceSymbol`.
	 * @param ctx the parse tree
	 */
	enterSinceSymbol?: (ctx: SinceSymbolContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.sinceSymbol`.
	 * @param ctx the parse tree
	 */
	exitSinceSymbol?: (ctx: SinceSymbolContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.untilSymbol`.
	 * @param ctx the parse tree
	 */
	enterUntilSymbol?: (ctx: UntilSymbolContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.untilSymbol`.
	 * @param ctx the parse tree
	 */
	exitUntilSymbol?: (ctx: UntilSymbolContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.boxMinusSymbol`.
	 * @param ctx the parse tree
	 */
	enterBoxMinusSymbol?: (ctx: BoxMinusSymbolContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.boxMinusSymbol`.
	 * @param ctx the parse tree
	 */
	exitBoxMinusSymbol?: (ctx: BoxMinusSymbolContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.boxPlusSymbol`.
	 * @param ctx the parse tree
	 */
	enterBoxPlusSymbol?: (ctx: BoxPlusSymbolContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.boxPlusSymbol`.
	 * @param ctx the parse tree
	 */
	exitBoxPlusSymbol?: (ctx: BoxPlusSymbolContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.triangleUpSymbol`.
	 * @param ctx the parse tree
	 */
	enterTriangleUpSymbol?: (ctx: TriangleUpSymbolContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.triangleUpSymbol`.
	 * @param ctx the parse tree
	 */
	exitTriangleUpSymbol?: (ctx: TriangleUpSymbolContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.triangleDownSymbol`.
	 * @param ctx the parse tree
	 */
	enterTriangleDownSymbol?: (ctx: TriangleDownSymbolContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.triangleDownSymbol`.
	 * @param ctx the parse tree
	 */
	exitTriangleDownSymbol?: (ctx: TriangleDownSymbolContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.closeIntervalSymbol`.
	 * @param ctx the parse tree
	 */
	enterCloseIntervalSymbol?: (ctx: CloseIntervalSymbolContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.closeIntervalSymbol`.
	 * @param ctx the parse tree
	 */
	exitCloseIntervalSymbol?: (ctx: CloseIntervalSymbolContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.selectIntervalSymbol`.
	 * @param ctx the parse tree
	 */
	enterSelectIntervalSymbol?: (ctx: SelectIntervalSymbolContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.selectIntervalSymbol`.
	 * @param ctx the parse tree
	 */
	exitSelectIntervalSymbol?: (ctx: SelectIntervalSymbolContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.timeGroupInfo`.
	 * @param ctx the parse tree
	 */
	enterTimeGroupInfo?: (ctx: TimeGroupInfoContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.timeGroupInfo`.
	 * @param ctx the parse tree
	 */
	exitTimeGroupInfo?: (ctx: TimeGroupInfoContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.timeGroupInfoInteger`.
	 * @param ctx the parse tree
	 */
	enterTimeGroupInfoInteger?: (ctx: TimeGroupInfoIntegerContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.timeGroupInfoInteger`.
	 * @param ctx the parse tree
	 */
	exitTimeGroupInfoInteger?: (ctx: TimeGroupInfoIntegerContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.timeGroupInfoDouble`.
	 * @param ctx the parse tree
	 */
	enterTimeGroupInfoDouble?: (ctx: TimeGroupInfoDoubleContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.timeGroupInfoDouble`.
	 * @param ctx the parse tree
	 */
	exitTimeGroupInfoDouble?: (ctx: TimeGroupInfoDoubleContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.timeUnit`.
	 * @param ctx the parse tree
	 */
	enterTimeUnit?: (ctx: TimeUnitContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.timeUnit`.
	 * @param ctx the parse tree
	 */
	exitTimeUnit?: (ctx: TimeUnitContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.term`.
	 * @param ctx the parse tree
	 */
	enterTerm?: (ctx: TermContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.term`.
	 * @param ctx the parse tree
	 */
	exitTerm?: (ctx: TermContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.stringConstTerm`.
	 * @param ctx the parse tree
	 */
	enterStringConstTerm?: (ctx: StringConstTermContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.stringConstTerm`.
	 * @param ctx the parse tree
	 */
	exitStringConstTerm?: (ctx: StringConstTermContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.integerConstTerm`.
	 * @param ctx the parse tree
	 */
	enterIntegerConstTerm?: (ctx: IntegerConstTermContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.integerConstTerm`.
	 * @param ctx the parse tree
	 */
	exitIntegerConstTerm?: (ctx: IntegerConstTermContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.doubleConstTerm`.
	 * @param ctx the parse tree
	 */
	enterDoubleConstTerm?: (ctx: DoubleConstTermContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.doubleConstTerm`.
	 * @param ctx the parse tree
	 */
	exitDoubleConstTerm?: (ctx: DoubleConstTermContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.booleanConstTerm`.
	 * @param ctx the parse tree
	 */
	enterBooleanConstTerm?: (ctx: BooleanConstTermContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.booleanConstTerm`.
	 * @param ctx the parse tree
	 */
	exitBooleanConstTerm?: (ctx: BooleanConstTermContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.dateConstTerm`.
	 * @param ctx the parse tree
	 */
	enterDateConstTerm?: (ctx: DateConstTermContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.dateConstTerm`.
	 * @param ctx the parse tree
	 */
	exitDateConstTerm?: (ctx: DateConstTermContext) => void;
	/**
	 * Enter a parse tree produced by the `list`
	 * labeled alternative in `DatalogpmParser.listTerm`.
	 * @param ctx the parse tree
	 */
	enterList?: (ctx: ListContext) => void;
	/**
	 * Exit a parse tree produced by the `list`
	 * labeled alternative in `DatalogpmParser.listTerm`.
	 * @param ctx the parse tree
	 */
	exitList?: (ctx: ListContext) => void;
	/**
	 * Enter a parse tree produced by the `emptySet`
	 * labeled alternative in `DatalogpmParser.setConstTerm`.
	 * @param ctx the parse tree
	 */
	enterEmptySet?: (ctx: EmptySetContext) => void;
	/**
	 * Exit a parse tree produced by the `emptySet`
	 * labeled alternative in `DatalogpmParser.setConstTerm`.
	 * @param ctx the parse tree
	 */
	exitEmptySet?: (ctx: EmptySetContext) => void;
	/**
	 * Enter a parse tree produced by the `stringSet`
	 * labeled alternative in `DatalogpmParser.setConstTerm`.
	 * @param ctx the parse tree
	 */
	enterStringSet?: (ctx: StringSetContext) => void;
	/**
	 * Exit a parse tree produced by the `stringSet`
	 * labeled alternative in `DatalogpmParser.setConstTerm`.
	 * @param ctx the parse tree
	 */
	exitStringSet?: (ctx: StringSetContext) => void;
	/**
	 * Enter a parse tree produced by the `integerSet`
	 * labeled alternative in `DatalogpmParser.setConstTerm`.
	 * @param ctx the parse tree
	 */
	enterIntegerSet?: (ctx: IntegerSetContext) => void;
	/**
	 * Exit a parse tree produced by the `integerSet`
	 * labeled alternative in `DatalogpmParser.setConstTerm`.
	 * @param ctx the parse tree
	 */
	exitIntegerSet?: (ctx: IntegerSetContext) => void;
	/**
	 * Enter a parse tree produced by the `doubleSet`
	 * labeled alternative in `DatalogpmParser.setConstTerm`.
	 * @param ctx the parse tree
	 */
	enterDoubleSet?: (ctx: DoubleSetContext) => void;
	/**
	 * Exit a parse tree produced by the `doubleSet`
	 * labeled alternative in `DatalogpmParser.setConstTerm`.
	 * @param ctx the parse tree
	 */
	exitDoubleSet?: (ctx: DoubleSetContext) => void;
	/**
	 * Enter a parse tree produced by the `dateSet`
	 * labeled alternative in `DatalogpmParser.setConstTerm`.
	 * @param ctx the parse tree
	 */
	enterDateSet?: (ctx: DateSetContext) => void;
	/**
	 * Exit a parse tree produced by the `dateSet`
	 * labeled alternative in `DatalogpmParser.setConstTerm`.
	 * @param ctx the parse tree
	 */
	exitDateSet?: (ctx: DateSetContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.varTerm`.
	 * @param ctx the parse tree
	 */
	enterVarTerm?: (ctx: VarTermContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.varTerm`.
	 * @param ctx the parse tree
	 */
	exitVarTerm?: (ctx: VarTermContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.anonTerm`.
	 * @param ctx the parse tree
	 */
	enterAnonTerm?: (ctx: AnonTermContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.anonTerm`.
	 * @param ctx the parse tree
	 */
	exitAnonTerm?: (ctx: AnonTermContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.paramTerm`.
	 * @param ctx the parse tree
	 */
	enterParamTerm?: (ctx: ParamTermContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.paramTerm`.
	 * @param ctx the parse tree
	 */
	exitParamTerm?: (ctx: ParamTermContext) => void;
	/**
	 * Enter a parse tree produced by `DatalogpmParser.falseTerm`.
	 * @param ctx the parse tree
	 */
	enterFalseTerm?: (ctx: FalseTermContext) => void;
	/**
	 * Exit a parse tree produced by `DatalogpmParser.falseTerm`.
	 * @param ctx the parse tree
	 */
	exitFalseTerm?: (ctx: FalseTermContext) => void;
	/**
	 * Enter a parse tree produced by the `iso8601DurationDefault`
	 * labeled alternative in `DatalogpmParser.iso8601Duration`.
	 * @param ctx the parse tree
	 */
	enterIso8601DurationDefault?: (ctx: Iso8601DurationDefaultContext) => void;
	/**
	 * Exit a parse tree produced by the `iso8601DurationDefault`
	 * labeled alternative in `DatalogpmParser.iso8601Duration`.
	 * @param ctx the parse tree
	 */
	exitIso8601DurationDefault?: (ctx: Iso8601DurationDefaultContext) => void;
	/**
	 * Enter a parse tree produced by the `iso8601DurationWeek`
	 * labeled alternative in `DatalogpmParser.iso8601Duration`.
	 * @param ctx the parse tree
	 */
	enterIso8601DurationWeek?: (ctx: Iso8601DurationWeekContext) => void;
	/**
	 * Exit a parse tree produced by the `iso8601DurationWeek`
	 * labeled alternative in `DatalogpmParser.iso8601Duration`.
	 * @param ctx the parse tree
	 */
	exitIso8601DurationWeek?: (ctx: Iso8601DurationWeekContext) => void;
}
